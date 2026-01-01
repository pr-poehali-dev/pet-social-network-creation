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

  const mockPets: Pet[] = [
    { id: 1, name: 'Барсик', species: 'Кот', avatar: 'https://images.unsplash.com/photo-1574158622682-e40e69881006' },
    { id: 2, name: 'Мурка', species: 'Кошка', avatar: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8' },
    { id: 3, name: 'Рекс', species: 'Собака', avatar: 'https://images.unsplash.com/photo-1568572933382-74d440642117' }
  ];

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
          ) : (
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
