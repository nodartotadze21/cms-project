import React from 'react';
import { Calendar, ChevronLeft, Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import { Post } from '../../types';

interface BlogDetailPageProps {
  post: Post | null;
  onBack: () => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ post, onBack }) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [post]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post?.title || '';

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);

    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">ბლოგი პოსტი ვერ მოიძებნა</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition mb-6"
      >
        <ChevronLeft size={20} />
        უკან დაბრუნება
      </button>

      <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover"
          />
        )}

        <div className="p-8 sm:p-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <Calendar size={18} />
            <span>{new Date(post.date).toLocaleDateString('ka-GE')}</span>
          </div>

          <div className="border-t-2 border-gray-200 pt-8">
            <div className="text-gray-700 whitespace-pre-wrap text-lg leading-relaxed">
              {post.content}
            </div>
          </div>

          <div className="border-t-2 border-gray-200 mt-8 pt-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <Share2 size={20} />
                <span>გაზიარება:</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                  title="გაზიარება Facebook-ზე"
                >
                  <Facebook size={20} />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition"
                  title="გაზიარება Twitter-ზე"
                >
                  <Twitter size={20} />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition"
                  title="გაზიარება LinkedIn-ზე"
                >
                  <Linkedin size={20} />
                </button>
                <button
                  onClick={copyToClipboard}
                  className={`p-2 rounded-full transition ${copied ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  title="ბმულის კოპირება"
                >
                  <Copy size={20} />
                </button>
                {copied && (
                  <span className="text-sm text-green-600 font-semibold animate-fade-in">
                    დაკოპირდა!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>

      <button
        onClick={onBack}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition"
      >
        უკან დაბრუნება
      </button>
    </div>
  );
};
