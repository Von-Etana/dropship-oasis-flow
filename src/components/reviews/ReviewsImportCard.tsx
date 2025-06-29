
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Star, Download, Eye, CheckCircle } from 'lucide-react';
import { ProductReview, ReviewsService } from '@/services/reviewsService';
import { useToast } from '@/hooks/use-toast';

interface ReviewsImportCardProps {
  productUrl: string;
  supplier: string;
  storeType: string;
}

export const ReviewsImportCard = ({ productUrl, supplier, storeType }: ReviewsImportCardProps) => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [importReviews, setImportReviews] = useState(true);
  const { toast } = useToast();

  const handleExtractReviews = async () => {
    if (!productUrl) return;
    
    setIsExtracting(true);
    try {
      const result = await ReviewsService.extractReviews(productUrl, supplier);
      
      if (result.success) {
        setReviews(result.reviews);
        setAverageRating(result.averageRating);
        toast({
          title: "Reviews Extracted",
          description: `Found ${result.totalReviews} reviews with ${result.averageRating} average rating`,
        });
      } else {
        toast({
          title: "Extraction Failed",
          description: result.error || "Failed to extract reviews",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to extract reviews",
        variant: "destructive",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const handleImportReviews = async () => {
    if (reviews.length === 0) return;
    
    setIsImporting(true);
    try {
      const success = await ReviewsService.importReviewsToStore(reviews, storeType, 'product-123');
      
      if (success) {
        toast({
          title: "Reviews Imported",
          description: `Successfully imported ${reviews.length} reviews to your ${storeType} store`,
        });
      } else {
        toast({
          title: "Import Failed",
          description: "Failed to import reviews to your store",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to import reviews",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Product Reviews</span>
          {reviews.length > 0 && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {renderStars(Math.floor(averageRating))}
                <span className="ml-2 text-sm font-medium">{averageRating}</span>
              </div>
              <Badge variant="secondary">{reviews.length} reviews</Badge>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Import reviews with product</span>
          <Switch 
            checked={importReviews}
            onCheckedChange={setImportReviews}
          />
        </div>

        {importReviews && (
          <>
            {reviews.length === 0 ? (
              <Button 
                onClick={handleExtractReviews}
                disabled={isExtracting || !productUrl}
                className="w-full"
                variant="outline"
              >
                {isExtracting ? (
                  <>
                    <Eye className="w-4 h-4 mr-2 animate-pulse" />
                    Extracting Reviews...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Extract Reviews
                  </>
                )}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="max-h-60 overflow-y-auto space-y-3">
                  {reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{review.author}</span>
                          {review.verified && (
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          )}
                        </div>
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">{review.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{review.date}</span>
                        {review.helpful && (
                          <span className="text-xs text-gray-500">{review.helpful} helpful</span>
                        )}
                      </div>
                    </div>
                  ))}
                  {reviews.length > 3 && (
                    <div className="text-center text-sm text-gray-500">
                      +{reviews.length - 3} more reviews
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handleImportReviews}
                  disabled={isImporting}
                  className="w-full"
                >
                  {isImporting ? (
                    <>
                      <Download className="w-4 h-4 mr-2 animate-spin" />
                      Importing Reviews...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Import {reviews.length} Reviews
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
