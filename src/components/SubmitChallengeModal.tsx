import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Pet {
  id: number;
  name: string;
  species: string;
  avatar: string;
}

interface SubmitChallengeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  challengeId: number;
  challengeTitle: string;
  onSubmit: (data: SubmitData) => Promise<void>;
}

export interface SubmitData {
  challengeId: number;
  petId: number;
  videoUrl: string;
  title: string;
  description: string;
}

const SubmitChallengeModal = ({ 
  open, 
  onOpenChange, 
  challengeId, 
  challengeTitle,
  onSubmit 
}: SubmitChallengeModalProps) => {
  const [petId, setPetId] = useState<string>('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('url');
  const [loading, setLoading] = useState(false);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);

  const mockPets: Pet[] = [
    { id: 1, name: 'Барсик', species: 'Кот', avatar: 'https://images.unsplash.com/photo-1574158622682-e40e69881006' },
    { id: 2, name: 'Мурка', species: 'Кошка', avatar: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8' },
    { id: 3, name: 'Рекс', species: 'Собака', avatar: 'https://images.unsplash.com/photo-1568572933382-74d440642117' }
  ];

  const validateVideo = (file: File) => {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (file.size < 1024 * 1024) {
      warnings.push('Видео очень маленькое (меньше 1 МБ). Убедитесь, что качество достаточное.');
    }

    if (file.size > 50 * 1024 * 1024) {
      warnings.push('Большой размер файла. Загрузка может занять время.');
    }

    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
    if (!validTypes.includes(file.type)) {
      warnings.push(`Формат ${file.type} может не поддерживаться. Рекомендуем MP4.`);
    }

    setValidationErrors(errors);
    setValidationWarnings(warnings);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        alert('Файл слишком большой! Максимум 100 МБ');
        return;
      }
      if (!file.type.startsWith('video/')) {
        alert('Пожалуйста, выберите видео файл');
        return;
      }
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreviewUrl(url);
      validateVideo(file);

      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        const duration = video.duration;
        const newWarnings = [...validationWarnings];
        
        if (duration < 3) {
          newWarnings.push('Видео слишком короткое (меньше 3 секунд).');
        }
        if (duration > 180) {
          newWarnings.push('Видео длиннее 3 минут. Рекомендуем сократить для лучшего результата.');
        }
        
        setValidationWarnings(newWarnings);
      };
      video.src = url;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!petId) {
      alert('Выберите питомца');
      return;
    }
    
    if (uploadMethod === 'file' && !videoFile) {
      alert('Загрузите видео файл');
      return;
    }
    
    if (uploadMethod === 'url' && !videoUrl) {
      alert('Введите ссылку на видео');
      return;
    }
    
    if (!title) {
      alert('Введите название');
      return;
    }

    setLoading(true);
    
    try {
      let finalVideoUrl = videoUrl;
      
      if (uploadMethod === 'file' && videoFile) {
        finalVideoUrl = `https://cdn.poehali.dev/videos/${Date.now()}_${videoFile.name}`;
      }
      
      await onSubmit({
        challengeId,
        petId: parseInt(petId),
        videoUrl: finalVideoUrl,
        title,
        description
      });
      
      setPetId('');
      setVideoFile(null);
      setVideoUrl('');
      setTitle('');
      setDescription('');
      setVideoPreviewUrl('');
      setValidationErrors([]);
      setValidationWarnings([]);
      onOpenChange(false);
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Icon name="Upload" size={24} className="text-primary" />
            Участвовать в челлендже
          </DialogTitle>
          <DialogDescription>
            {challengeTitle}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="pet">Выберите питомца *</Label>
            <Select value={petId} onValueChange={setPetId}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите питомца для участия" />
              </SelectTrigger>
              <SelectContent>
                {mockPets.map(pet => (
                  <SelectItem key={pet.id} value={pet.id.toString()}>
                    <div className="flex items-center gap-2">
                      <span>{pet.name}</span>
                      <span className="text-muted-foreground text-sm">({pet.species})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Способ загрузки видео *</Label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={uploadMethod === 'url' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => setUploadMethod('url')}
              >
                <Icon name="Link" size={16} className="mr-2" />
                Ссылка на видео
              </Button>
              <Button
                type="button"
                variant={uploadMethod === 'file' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => setUploadMethod('file')}
              >
                <Icon name="Upload" size={16} className="mr-2" />
                Загрузить файл
              </Button>
            </div>
          </div>

          {uploadMethod === 'url' ? (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Ссылка на видео *</Label>
                <Input
                  id="videoUrl"
                  type="url"
                  placeholder="https://youtube.com/watch?v=... или прямая ссылка"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Поддерживаются: YouTube, Vimeo, прямые ссылки на видео
                </p>
              </div>

              {videoUrl && (
                <div className="border-2 rounded-lg overflow-hidden bg-muted">
                  <div className="aspect-video flex items-center justify-center">
                    {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                      <div className="text-center p-8">
                        <Icon name="Youtube" size={48} className="mx-auto mb-3 text-red-600" />
                        <p className="text-sm text-muted-foreground">YouTube видео будет встроено после отправки</p>
                      </div>
                    ) : videoUrl.includes('vimeo.com') ? (
                      <div className="text-center p-8">
                        <Icon name="Video" size={48} className="mx-auto mb-3 text-blue-600" />
                        <p className="text-sm text-muted-foreground">Vimeo видео будет встроено после отправки</p>
                      </div>
                    ) : (
                      <video 
                        src={videoUrl} 
                        controls 
                        className="w-full h-full"
                        onError={() => {
                          console.error('Failed to load video preview');
                        }}
                      >
                        Ваш браузер не поддерживает видео
                      </video>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="videoFile">Загрузить видео *</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <input
                    id="videoFile"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="videoFile" className="cursor-pointer">
                    <Icon name="Upload" size={48} className="mx-auto mb-3 text-muted-foreground" />
                    {videoFile ? (
                      <div>
                        <p className="font-semibold text-primary">{videoFile.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {(videoFile.size / (1024 * 1024)).toFixed(2)} МБ
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-semibold">Нажмите для выбора видео</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          MP4, MOV, AVI до 100 МБ
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {videoPreviewUrl && (
                <div className="space-y-3">
                  <div className="border-2 rounded-lg overflow-hidden bg-black">
                    <video 
                      src={videoPreviewUrl} 
                      controls 
                      className="w-full aspect-video"
                    >
                      Ваш браузер не поддерживает видео
                    </video>
                    <div className="p-3 bg-muted/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="Eye" size={16} className="text-green-600" />
                        <span className="text-sm font-medium text-green-600">Предпросмотр готов</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setVideoFile(null);
                          setVideoPreviewUrl('');
                          setValidationErrors([]);
                          setValidationWarnings([]);
                        }}
                        className="gap-1 text-red-600 hover:text-red-700"
                      >
                        <Icon name="X" size={14} />
                        Удалить
                      </Button>
                    </div>
                  </div>

                  {validationErrors.length > 0 && (
                    <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Icon name="AlertCircle" size={16} className="text-red-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-red-600 mb-1">Критические ошибки:</p>
                          <ul className="text-sm text-red-600 space-y-1">
                            {validationErrors.map((error, i) => (
                              <li key={i}>• {error}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {validationWarnings.length > 0 && (
                    <div className="bg-yellow-50 dark:bg-yellow-950/30 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Icon name="AlertTriangle" size={16} className="text-yellow-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-yellow-600 mb-1">Предупреждения:</p>
                          <ul className="text-sm text-yellow-600 space-y-1">
                            {validationWarnings.map((warning, i) => (
                              <li key={i}>• {warning}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {validationErrors.length === 0 && validationWarnings.length === 0 && (
                    <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Icon name="CheckCircle" size={16} className="text-green-600" />
                        <p className="text-sm font-semibold text-green-600">Видео прошло проверку! Готово к отправке.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Название участия *</Label>
            <Input
              id="title"
              placeholder="Например: Барсик танцует под Jingle Bells!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">
              {title.length}/100 символов
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание (необязательно)</Label>
            <Textarea
              id="description"
              placeholder="Расскажите о вашем видео..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              {description.length}/500 символов
            </p>
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex items-start gap-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold mb-1">Правила участия:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Видео должно соответствовать теме челленджа</li>
                  <li>Питомец должен быть в главной роли</li>
                  <li>Запрещен контент с жестокостью</li>
                  <li>Модерация занимает до 24 часов</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              className="flex-1 gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  Отправка...
                </>
              ) : (
                <>
                  <Icon name="Send" size={16} />
                  Отправить участие
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitChallengeModal;