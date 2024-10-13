import Banner from "./_components/banner";
import Bento from "./_components/bento";
import Flows from "./_components/flows";
import Latest from "./_components/latest";
import Reviews from "./_components/reviews";
import Support from "./_components/support";

export default function HomeView() {
  return (
    <div className="overflow-x-clip">
      <Banner />
      <Support />
      <Flows />
      <Bento />
      <Latest />
      <Reviews />
    </div>
  );
}
