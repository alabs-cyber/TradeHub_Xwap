import { Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Item } from '@/services/itemService';
import { formatPrice } from '@/utils/helpers';

interface ItemCardProps {
  item: Item;
  onMakeOffer?: (item: Item) => void;
}

const ItemCard = ({ item, onMakeOffer }: ItemCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-card-hover">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold line-clamp-1">{item.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{formatPrice(item.price)}</span>
          {item.rating && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium">{item.rating.rate}</span>
              <span className="text-muted-foreground">({item.rating.count})</span>
            </div>
          )}
        </div>

        <Button 
          className="w-full" 
          variant="default"
          onClick={() => onMakeOffer?.(item)}
        >
          Make Offer
        </Button>
      </div>
    </Card>
  );
};

export default ItemCard;
