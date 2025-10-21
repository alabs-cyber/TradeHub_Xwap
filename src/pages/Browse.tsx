import { useState, useEffect } from 'react';
import { itemService, Item } from '@/services/itemService';
import ItemCard from '@/components/ItemCard';
import SearchBar from '@/components/SearchBar';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Modal from '@/components/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Browse = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [offerAmount, setOfferAmount] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchQuery, selectedCategory, items]);

  const fetchItems = async () => {
    try {
      const data = await itemService.getAllItems();
      setItems(data);
      setFilteredItems(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch items',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await itemService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories');
    }
  };

  const filterItems = () => {
    let filtered = items;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const handleMakeOffer = (item: Item) => {
    setSelectedItem(item);
    setOfferModalOpen(true);
  };

  const submitOffer = () => {
    toast({
      title: 'Offer Sent!',
      description: `Your offer of $${offerAmount} for "${selectedItem?.title}" has been sent.`,
    });
    setOfferModalOpen(false);
    setOfferAmount('');
    setSelectedItem(null);
  };

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Browse Items</h1>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={filterItems}
        />
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : filteredItems.length === 0 ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-muted-foreground">No items found</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} onMakeOffer={handleMakeOffer} />
          ))}
        </div>
      )}

      <Modal
        open={offerModalOpen}
        onOpenChange={setOfferModalOpen}
        title="Make an Offer"
        description={`Make an offer for "${selectedItem?.title}"`}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Your Offer ($)</Label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={submitOffer}>
              Send Offer
            </Button>
            <Button variant="outline" onClick={() => setOfferModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Browse;
