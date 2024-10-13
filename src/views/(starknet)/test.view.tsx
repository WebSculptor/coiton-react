import ApprovedListings from "./_components/approved-listings";
import UnapprovedListings from "./_components/unapproved-listings";
import RegisterValidator from "./_components/register-validator";
import ValidatorTransactions from "./_components/validator-transactions";
import Organizations from "./_components/organizations";
import RegisterOrganization from "./_components/register-organization";
import CreateListing from "./_components/create-listing";
import StakeListingFee from "./_components/stake-listing-fee";
import ERCs from "./_components/ercs";

export default function TestView() {
  return (
    <div className="flex flex-col gap-20 py-20">
      <div className="flex flex-col">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="col-span-1 lg:col-span-2">
            <ERCs />
          </div>
          <div className="md:col-span-1">
            <StakeListingFee />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="mb-2 font-sans_regular text-2xl">Validator Functions</p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="md:col-span-1">
            <RegisterValidator />
          </div>
          <div className="col-span-1 lg:col-span-2">
            <ValidatorTransactions />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="mb-2 font-sans_regular text-2xl">
          Organization Functions
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="col-span-1 lg:col-span-2">
            <Organizations />
          </div>
          <div className="md:col-span-1">
            <RegisterOrganization />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="mb-2 font-sans_regular text-2xl">Listings Functions</p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="flex flex-col gap-4 md:col-span-1">
            <ApprovedListings />
            <UnapprovedListings />
          </div>
          <div className="col-span-1 lg:col-span-2">
            <CreateListing />
          </div>
        </div>
      </div>
    </div>
  );
}
