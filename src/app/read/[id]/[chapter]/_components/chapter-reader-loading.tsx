export default function ChapterReaderLoading() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header Loading */}
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-slate-700 rounded animate-pulse"></div>
              <div className="h-6 w-48 bg-slate-700 rounded animate-pulse"></div>
            </div>
            <div className="h-6 w-24 bg-slate-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Content Loading */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-full h-96 bg-slate-800 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* Navigation Loading */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-slate-800 rounded-full px-6 py-3 flex items-center gap-4">
          <div className="w-8 h-8 bg-slate-700 rounded animate-pulse"></div>
          <div className="h-4 w-16 bg-slate-700 rounded animate-pulse"></div>
          <div className="w-8 h-8 bg-slate-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
