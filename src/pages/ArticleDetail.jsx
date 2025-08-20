import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { cardData, latestArticles } from '../components/cardData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Author from '../components/Author';
import Tag from '../components/Tag';
import RelatedArticles from '../components/RelatedArticles';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export default function ArticleDetail() {
  const { id } = useParams();

  const allArticles = [...cardData, ...latestArticles]; 
  const article = allArticles.find(article => article.id === parseInt(id));

  if (!article) {
    return (
      <div className="min-h-screen text-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-8">The article you're looking for doesn't exist or has been moved.</p>
          <Link 
            to="/blogs" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white rounded-full hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen m-16">
      <Navbar />
      
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          to="/blogs" 
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Tag tag={article.tag} />
            <span className="text-gray-400">•</span>
            <span className="text-gray-400 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed">
            {article.description}
          </p>
          
          <div className="mt-6">
            <Author authors={article.authors} date={article.date} variant="default" />
          </div>
        </header>

        {/* Featured Image */}
        {article.img && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img 
              src={article.img} 
              alt={article.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Article Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none text-white"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-800">
          <RelatedArticles 
            currentArticleId={article.id} 
            currentTags={article.relatedTags} 
          />
        </footer>
      </article>
      
      <Footer />
    </div>
  );
}
