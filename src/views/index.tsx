import AboutView from "./(public)/about.view";
import BlogView from "./(public)/blog.view";
import HomeView from "./(public)/home.view";
import ListingsView from "./(public)/listings.view";
import TeamsView from "./(public)/team.view";
import TokenView from "./(public)/token.view";
import StarknetView from "./(starknet)/starknet.view";

export const views = {
  home: <HomeView />,
  about: <AboutView />,
  team: <TeamsView />,
  listings: <ListingsView />,
  token: <TokenView />,
  blog: <BlogView />,

  // test
  test: <StarknetView />,
};
