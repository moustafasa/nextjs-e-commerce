import AboutPageAnime from "./_components/AboutPageAnime";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">About Us</h1>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <p className="text-lg dark:text-gray-icons">
            Welcome to our e-commerce platform, where quality meets convenience.
            We strive to provide the best shopping experience with a carefully
            curated selection of products.
          </p>

          <p className="text-lg dark:text-gray-icons">
            Our mission is to make online shopping accessible, enjoyable, and
            secure for all our customers. We value quality, transparency, and
            customer satisfaction above all.
          </p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3 dark:text-white">
              Why Choose Us?
            </h2>
            <ul className="list-disc pl-5 space-y-2 dark:text-gray-icons">
              <li>Quality Products</li>
              <li>Secure Shopping</li>
              <li>Fast Delivery</li>
              <li>24/7 Customer Support</li>
              <li>Easy Returns</li>
            </ul>
          </div>
        </div>

        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <AboutPageAnime />
        </div>
      </div>
    </div>
  );
}
