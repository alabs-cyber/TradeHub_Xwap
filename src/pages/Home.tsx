import { Link } from 'react-router-dom';
import { ArrowRight, Package, MessageCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/images/hero-marketplace.jpg';
import ItemCard from '@/components/ItemCard';
import { useFetch } from '@/hooks/useFetch';
import { itemService, Item } from '@/services/itemService';
import Loader from '@/components/Loader';

const Home = () => {
  const { data: items, loading } = useFetch<Item[]>(() => itemService.getAllItems());

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Trade Items You Love with People You Trust
              </h1>
              <p className="text-lg text-muted-foreground">
                Join thousands of users exchanging items on TradeHub. Find what you need, offer what you don't.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/browse">
                  <Button size="lg" className="gap-2">
                    Browse Items
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/add-item">
                  <Button size="lg" variant="outline" className="gap-2">
                    List an Item
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="Marketplace items"
                className="rounded-2xl shadow-card-hover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-3 p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
                <Package className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Easy Listing</h3>
              <p className="text-muted-foreground">
                List your items in seconds with our simple and intuitive interface.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
                <MessageCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Direct Communication</h3>
              <p className="text-muted-foreground">
                Chat directly with other users to negotiate and finalize trades.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Secure Trading</h3>
              <p className="text-muted-foreground">
                Trade with confidence knowing your transactions are safe and secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Featured Items</h2>
              <p className="text-muted-foreground">Check out these popular items</p>
            </div>
            <Link to="/browse">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {items?.slice(0, 8).map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
