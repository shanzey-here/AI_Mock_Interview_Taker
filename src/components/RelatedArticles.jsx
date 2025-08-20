import React, { useMemo } from "react";
import BlogCard from "./BlogCard";
import { cardData, latestArticles } from "./cardData";

// Fisher-Yates shuffle with seed for consistent randomization
const shuffleArray = (array, seed) => {
  const shuffled = [...array];
  let currentSeed = seed;

  // Simple seeded random number generator
  const seededRandom = () => {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    return currentSeed / 233280;
  };

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

// Fallback article selection
const getFallbackArticles = (
  articles,
  maxArticles,
  seed = Date.now(),
  currentArticleId = null
) => {
  // First fallback: same category/tag
  if (currentArticleId) {
    const allArticles = [...cardData, ...latestArticles];
    const currentArticle = allArticles.find((a) => a.id === currentArticleId);

    if (currentArticle) {
      const sameCategory = articles.filter(
        (article) => article.tag === currentArticle.tag
      );

      if (sameCategory.length > 0) {
        const shuffled = shuffleArray(sameCategory, seed);
        return shuffled.slice(0, maxArticles);
      }
    }
  }

  // Second fallback: latest articles (excluding current)
  const shuffledLatest = shuffleArray(articles, seed);
  return shuffledLatest.slice(0, maxArticles);
};

const RelatedArticles = ({ currentArticleId, currentTags, limit = 3 }) => {
  const relatedArticles = useMemo(() => {
    const allArticles = [...cardData, ...latestArticles];

    // Filter out current article
    const otherArticles = allArticles.filter(
      (article) => article.id !== currentArticleId
    );

    // If no tags provided, return fallback
    if (
      !currentTags ||
      !Array.isArray(currentTags) ||
      currentTags.length === 0
    ) {
      return getFallbackArticles(
        otherArticles,
        limit,
        Date.now(),
        currentArticleId
      );
    }

    // Calculate normalized scores to prevent bias toward longer tag lists
    const articlesWithScores = otherArticles.map((article) => {
      const articleTags = article.relatedTags || [];
      const currentTagSet = new Set(currentTags);

      // Calculate intersection
      const matchingTags = articleTags.filter((tag) => currentTagSet.has(tag));

      // Normalize score: (matching/current) * (matching/article) to prevent bias
      const normalizedScore =
        matchingTags.length > 0
          ? (matchingTags.length / currentTags.length) *
            (matchingTags.length / articleTags.length)
          : 0;

      return {
        ...article,
        matchScore: normalizedScore,
        matchingTags: matchingTags.length,
        totalTags: articleTags.length,
      };
    });

    // Filter articles with matches and sort by normalized score
    const matchingArticles = articlesWithScores
      .filter((article) => article.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

    if (matchingArticles.length > 0) {
      // Add randomization while maintaining some consistency
      const shuffled = shuffleArray(
        matchingArticles,
        currentArticleId || Date.now()
      );
      return shuffled.slice(0, limit);
    }

    // Fallback if no tag matches
    return getFallbackArticles(
      otherArticles,
      limit,
      currentArticleId || Date.now(),
      currentArticleId
    );
  }, [currentArticleId, currentTags, limit]);

  // Fallback content when no related articles found
  if (relatedArticles.length === 0) {
    return (
      <div className="related-articles">
        <h2 className="text-3xl font-bold text-white mb-8">Discover More</h2>
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-4">
            No related articles found
          </h3>
          <p className="text-gray-400 mb-6">
            Explore our latest articles and discover new insights
          </p>
          <a
            href="/blogs"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Articles
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="related-articles">
      <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
      <div
        className={`grid gap-6 ${
          relatedArticles.length === 1
            ? "grid-cols-1"
            : relatedArticles.length === 2
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {relatedArticles.map((article) => (
          <BlogCard
            key={article.id}
            article={article}
            variant="compact"
            showImage={false}
            className="related-articles__card"
            titleSize="text-xl"
            descriptionLines={2}
            showArrow={false}
          />
        ))}
      </div>

      {relatedArticles.length < limit && (
        <div className="mt-8 text-center">
          <a
            href="/blogs"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            View more articles →
          </a>
        </div>
      )}
    </div>
  );
};

export default RelatedArticles;
