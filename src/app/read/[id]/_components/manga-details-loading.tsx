export default function MangaDetailsLoading() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section Loading */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Image Loading */}
          <div className="lg:col-span-1">
            <div className="w-full h-96 lg:h-[500px] rounded-lg bg-slate-800 animate-pulse"></div>
          </div>

          {/* Details Loading */}
          <div className="lg:col-span-2 space-y-6">
            <div className="h-12 w-3/4 bg-slate-800 rounded animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-6 w-1/2 bg-slate-800 rounded animate-pulse"></div>
              <div className="h-6 w-1/3 bg-slate-800 rounded animate-pulse"></div>
              <div className="h-6 w-2/3 bg-slate-800 rounded animate-pulse"></div>
              <div className="h-6 w-1/4 bg-slate-800 rounded animate-pulse"></div>
            </div>

            {/* Genres Loading */}
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-20 rounded-full bg-slate-800 animate-pulse"
                ></div>
              ))}
            </div>

            {/* Rating Loading */}
            <div className="flex items-center gap-2">
              <div className="h-6 w-24 bg-slate-800 rounded animate-pulse"></div>
              <div className="h-6 w-16 bg-slate-800 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Chapters Section Loading */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg">
          <div className="p-6 border-b border-slate-700">
            <div className="h-8 w-32 bg-slate-700 rounded animate-pulse"></div>
          </div>
          <div className="p-6 space-y-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-slate-700 rounded-lg"
              >
                <div className="space-y-2">
                  <div className="h-5 w-40 bg-slate-600 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-slate-600 rounded animate-pulse"></div>
                </div>
                <div className="text-right space-y-2">
                  <div className="h-4 w-16 bg-slate-600 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-slate-600 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
