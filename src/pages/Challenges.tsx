import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import SubmitChallengeModal, { SubmitData } from '@/components/SubmitChallengeModal';

const API_URL = 'https://functions.poehali.dev/bca8d5ab-f38c-49d7-9150-12a7cdabdefb';
const MOCK_USER_ID = '2';

interface Challenge {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  prize: string;
  startDate: string;
  endDate: string;
  status: string;
  entriesCount: number;
  topVotes: number;
  daysLeft: number;
}

interface Entry {
  id: number;
  videoUrl: string;
  title: string;
  description: string;
  votesCount: number;
  userName: string;
  userAvatar: string;
  petName: string;
  petAvatar: string;
  hasVoted: boolean;
}

const Challenges = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [submitChallengeId, setSubmitChallengeId] = useState<number>(0);
  const [submitChallengeTitle, setSubmitChallengeTitle] = useState<string>('');

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    try {
      const response = await fetch(`${API_URL}?path=list`);
      const data = await response.json();
      setChallenges(data);
    } catch (error) {
      console.error('Failed to load challenges:', error);
    }
  };

  const loadEntries = async (challengeId: number) => {
    try {
      const response = await fetch(`${API_URL}?path=entries&challengeId=${challengeId}`, {
        headers: { 'X-User-Id': MOCK_USER_ID }
      });
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Failed to load entries:', error);
    }
  };

  const handleChallengeClick = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    loadEntries(challenge.id);
  };

  const handleVote = async (entryId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?path=vote`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-User-Id': MOCK_USER_ID
        },
        body: JSON.stringify({ entryId })
      });
      const data = await response.json();
      
      if (data.success) {
        toast({ title: 'Успех!', description: 'Ваш голос учтён' });
        if (selectedChallenge) {
          loadEntries(selectedChallenge.id);
        }
      } else {
        toast({ title: 'Ошибка', description: data.error, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось проголосовать', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSubmitModal = (challengeId: number, challengeTitle: string) => {
    setSubmitChallengeId(challengeId);
    setSubmitChallengeTitle(challengeTitle);
    setSubmitModalOpen(true);
  };

  const handleSubmitEntry = async (data: SubmitData) => {
    try {
      const response = await fetch(`${API_URL}?path=submit`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-User-Id': MOCK_USER_ID
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      
      if (result.success) {
        toast({ 
          title: 'Успешно отправлено!', 
          description: 'Ваше участие будет проверено модераторами в течение 24 часов' 
        });
        loadChallenges();
        if (selectedChallenge) {
          loadEntries(selectedChallenge.id);
        }
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({ 
        title: 'Ошибка', 
        description: 'Не удалось отправить участие. Попробуйте позже.', 
        variant: 'destructive' 
      });
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500/10 via-background to-pink-500/10">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="gap-2" onClick={() => navigate('/')}>
                <Icon name="ArrowLeft" size={20} />
                <span>Назад</span>
              </Button>
              
              <div className="flex items-center gap-2">
                <div className="text-2xl">🏆</div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Челленджи ПетСеть
                </h1>
              </div>
            </div>

            {challenges.length > 0 && (
              <Button 
                className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => handleOpenSubmitModal(challenges[0].id, challenges[0].title)}
              >
                <Icon name="Upload" size={16} />
                Участвовать
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {!selectedChallenge ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Активные челленджи</h2>
              <p className="text-muted-foreground">Участвуйте в конкурсах и выигрывайте призы!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map(challenge => (
                <Card 
                  key={challenge.id} 
                  className="border-2 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer overflow-hidden group"
                  onClick={() => handleChallengeClick(challenge)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={challenge.imageUrl} 
                      alt={challenge.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-red-600 text-white">
                        {challenge.daysLeft} дней
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-bold text-lg">{challenge.title}</h3>
                    </div>
                  </div>
                  
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Gift" size={16} className="text-yellow-600" />
                        <span className="font-semibold text-yellow-600">{challenge.prize}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Icon name="Users" size={16} className="text-primary" />
                          <span>{challenge.entriesCount} участников</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Heart" size={16} className="text-red-500" />
                          <span>{challenge.topVotes} голосов</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full mt-4 gap-2 group-hover:bg-primary group-hover:text-primary-foreground">
                      Смотреть участников
                      <Icon name="ChevronRight" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <Button 
                variant="ghost" 
                className="gap-2 mb-4"
                onClick={() => {
                  setSelectedChallenge(null);
                  setEntries([]);
                }}
              >
                <Icon name="ArrowLeft" size={20} />
                Все челленджи
              </Button>

              <Card className="border-2">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={selectedChallenge.imageUrl} 
                    alt={selectedChallenge.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-white text-3xl font-bold mb-2">{selectedChallenge.title}</h1>
                        <p className="text-white/90 text-lg">{selectedChallenge.description}</p>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <Badge className="bg-red-600 text-white text-lg px-4 py-2">
                          {selectedChallenge.daysLeft} дней
                        </Badge>
                        <Button 
                          className="gap-2 bg-white text-purple-600 hover:bg-white/90"
                          onClick={() => handleOpenSubmitModal(selectedChallenge.id, selectedChallenge.title)}
                        >
                          <Icon name="Upload" size={16} />
                          Участвовать
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <Icon name="Gift" size={24} className="text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Приз</p>
                        <p className="font-semibold">{selectedChallenge.prize}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Icon name="Users" size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Участников</p>
                        <p className="font-semibold">{selectedChallenge.entriesCount}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                        <Icon name="Heart" size={24} className="text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Лидер</p>
                        <p className="font-semibold">{selectedChallenge.topVotes} голосов</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entries.map((entry, index) => (
                <Card key={entry.id} className="border-2 hover:shadow-lg transition-all overflow-hidden">
                  {index < 3 && (
                    <div className="absolute top-3 left-3 z-10">
                      <Badge className={`text-lg px-3 py-1 ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-400' : 
                        'bg-orange-600'
                      }`}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'} #{index + 1}
                      </Badge>
                    </div>
                  )}
                  
                  <div className="relative h-64 bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Icon name="Video" size={48} className="mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Видео участника</p>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="w-10 h-10 ring-2 ring-border">
                        <AvatarImage src={entry.userAvatar} />
                        <AvatarFallback>{entry.userName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{entry.userName}</p>
                        <p className="text-xs text-muted-foreground">с питомцем {entry.petName}</p>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{entry.title}</CardTitle>
                    {entry.description && (
                      <CardDescription>{entry.description}</CardDescription>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Progress value={(entry.votesCount / selectedChallenge.topVotes) * 100} className="flex-1" />
                      <span className="text-sm font-semibold">{entry.votesCount}</span>
                    </div>

                    {entry.hasVoted ? (
                      <Button 
                        variant="outline" 
                        className="w-full gap-2 border-green-600 text-green-600"
                        disabled
                      >
                        <Icon name="CheckCircle" size={16} />
                        Вы проголосовали
                      </Button>
                    ) : (
                      <Button 
                        className="w-full gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                        onClick={() => handleVote(entry.id)}
                        disabled={loading}
                      >
                        <Icon name="Heart" size={16} />
                        Проголосовать
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>

      <SubmitChallengeModal
        open={submitModalOpen}
        onOpenChange={setSubmitModalOpen}
        challengeId={submitChallengeId}
        challengeTitle={submitChallengeTitle}
        onSubmit={handleSubmitEntry}
      />
    </div>
  );
};

export default Challenges;