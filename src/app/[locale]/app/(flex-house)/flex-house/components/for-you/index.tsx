import FollowCreatorsBox from "../feed/box/follow-creators/FollowCreatorsBox";
import PostCard from "../feed/cards/PostCard";

export default function ForYouTab() {
  return (
    <div className="">
      <div className="flex md:flex-row flex-col gap-4 md:w-[70vw] w-full">
        <div className="md:px-2 px-0 py-0 gap-4 flex-1 flex-col h-[67vh] overflow-y-auto">
          <>
            {Array.from({ length: 10 }).map((_, i) => {
              return <PostCard key={i} post={undefined} />;
            })}
          </>
        </div>
        <div className="md:flex hidden flex-col gap-4 md:w-[20vw] w-full h-[67vh] overflow-y-auto">
          <FollowCreatorsBox />
        </div>
      </div>
    </div>
  );
}
