import Chat from '../../components/common/Chat';

const Community = () => {
  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">Teacher Community</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Interact with students in the community
        </p>
      </div>
      
      <div className="h-[calc(100%-100px)]">
        <Chat type="community" />
      </div>
    </div>
  );
};

export default Community;