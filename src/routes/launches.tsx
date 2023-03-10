import { launches } from '@/api/launches';
import { MainPage } from '@/components/Layout';
import { useInfiniteQuery } from '@tanstack/react-query';
import { NotFound } from './error-page';

const Launches = () => {
  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ['launches'],
    queryFn: launches,
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
  });

  if (isError) return <NotFound />;

  return (
    <>
      <div className={'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'}>
        {data?.pages?.map((launches) =>
          launches.docs.map((data) => (
            <div
              key={data.id}
              className="card w-40 md:w-64 lg:w-96 bg-base-100 hover:shadow-xl cursor-pointer shadow-md h-64"
            >
              <div className="card-body">
                <h2 className="card-title">{data.name}</h2>
                <p className=" whitespace-normal line-clamp-6">
                  {data.details}
                </p>
                <span
                  className={`badge ${
                    data.success ? 'badge-success' : 'badge-error'
                  }`}
                >
                  {data.success ? 'Success' : 'Failure'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Launches;
