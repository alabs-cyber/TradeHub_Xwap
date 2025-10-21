import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Clock } from 'lucide-react';
import { formatPrice } from '@/utils/helpers';

interface Offer {
  id: number;
  itemTitle: string;
  itemImage: string;
  offerAmount: number;
  status: 'pending' | 'accepted' | 'rejected';
  date: Date;
  fromUser: string;
}

const Offers = () => {
  const [offers] = useState<Offer[]>([
    {
      id: 1,
      itemTitle: 'Vintage Camera',
      itemImage: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
      offerAmount: 150,
      status: 'pending',
      date: new Date('2024-01-15'),
      fromUser: 'John Doe',
    },
    {
      id: 2,
      itemTitle: 'Designer Watch',
      itemImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      offerAmount: 200,
      status: 'accepted',
      date: new Date('2024-01-14'),
      fromUser: 'Jane Smith',
    },
    {
      id: 3,
      itemTitle: 'Wireless Headphones',
      itemImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      offerAmount: 80,
      status: 'rejected',
      date: new Date('2024-01-13'),
      fromUser: 'Mike Johnson',
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
      case 'accepted':
        return <Badge className="gap-1 bg-primary"><Check className="h-3 w-3" />Accepted</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="gap-1"><X className="h-3 w-3" />Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Offers</h1>
        <p className="text-muted-foreground">Manage your trade offers</p>
      </div>

      <div className="space-y-4">
        {offers.map((offer) => (
          <Card key={offer.id} className="p-6">
            <div className="flex gap-6">
              <img
                src={offer.itemImage}
                alt={offer.itemTitle}
                className="h-24 w-24 rounded-lg object-cover"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{offer.itemTitle}</h3>
                      <p className="text-sm text-muted-foreground">
                        Offer from: {offer.fromUser}
                      </p>
                    </div>
                    {getStatusBadge(offer.status)}
                  </div>
                  <p className="text-lg font-bold text-primary">
                    Offer: {formatPrice(offer.offerAmount)}
                  </p>
                </div>
                {offer.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button size="sm" className="gap-1">
                      <Check className="h-4 w-4" />
                      Accept
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <X className="h-4 w-4" />
                      Decline
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Offers;
