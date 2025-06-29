
export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  title?: string;
  content: string;
  date: string;
  verified?: boolean;
  helpful?: number;
}

export interface ReviewsImportResult {
  success: boolean;
  reviews: ProductReview[];
  totalReviews: number;
  averageRating: number;
  error?: string;
}

export class ReviewsService {
  static async extractReviews(url: string, supplier: string): Promise<ReviewsImportResult> {
    try {
      console.log(`Extracting reviews from ${supplier} for URL: ${url}`);
      
      // Simulate review extraction based on supplier
      const mockReviews = this.generateMockReviews(supplier);
      
      return {
        success: true,
        reviews: mockReviews,
        totalReviews: mockReviews.length,
        averageRating: this.calculateAverageRating(mockReviews)
      };
    } catch (error) {
      console.error('Error extracting reviews:', error);
      return {
        success: false,
        reviews: [],
        totalReviews: 0,
        averageRating: 0,
        error: 'Failed to extract reviews'
      };
    }
  }

  static async importReviewsToStore(reviews: ProductReview[], storeType: string, productId: string): Promise<boolean> {
    try {
      console.log(`Importing ${reviews.length} reviews to ${storeType} store for product ${productId}`);
      
      // Simulate API call to store
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return true;
    } catch (error) {
      console.error('Error importing reviews:', error);
      return false;
    }
  }

  private static generateMockReviews(supplier: string): ProductReview[] {
    const authors = ['John D.', 'Sarah M.', 'Mike R.', 'Lisa K.', 'David P.', 'Emma T.'];
    const reviewTexts = [
      'Great product, exactly as described. Fast shipping!',
      'Good quality for the price. Recommended.',
      'Amazing! Better than expected. Will buy again.',
      'Decent product but could be better packaged.',
      'Love it! Perfect for my needs.',
      'Nice quality, fast delivery. Happy with purchase.'
    ];

    return Array.from({ length: 6 }, (_, index) => ({
      id: `review-${index + 1}`,
      author: authors[index],
      rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
      content: reviewTexts[index],
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      verified: Math.random() > 0.3,
      helpful: Math.floor(Math.random() * 10)
    }));
  }

  private static calculateAverageRating(reviews: ProductReview[]): number {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }
}
