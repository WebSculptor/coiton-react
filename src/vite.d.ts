//? ============= TYPES ============= ?//
declare type SITE_CONFIG = {
  title: string;
  description: string;
};

declare type ROUTES = {
  label: string;
  path: any;
};

declare type CLIENTS_FEEDBACK = {
  id: number;
  feedback: string;
  name: string;
  position: string;
  image?: string;
};

declare type LISTING = {
  id: number;
  details: any;
  hash: number;
  owner: string;
};

declare type CREATE_LISTING = {
  title: string;
  price: number; // Consider using BigInt if you are working with large numbers, such as WEI
  description: string;
  location: string;
  amenities: string[];
  images: string[]; // Array of image URLs
  owner: {
    name: string;
    contact: string;
    phone: string;
  };
  availability: {
    availableFrom: string; // ISO date string
    availableTo: string; // ISO date string
  };
  size: {
    area: number; // Area in square meters
    bedrooms: number; // Number of bedrooms
    bathrooms: number; // Number of bathrooms
  };
  optionalFeatures: {
    furnished: boolean;
    petFriendly: boolean;
    smokingAllowed: boolean;
  };
  ratings: {
    averageRating: number; // Average rating (e.g., 4.5)
    numberOfReviews: number; // Total number of reviews
  };
  createdAt: string; // ISO date string for creation timestamp
  updatedAt: string; // ISO date string for last update timestamp
};

declare type ORGANIZATION = {
  id: number;
  name: string;
  region: string;
  validator: number;
  domain: string;
};

declare type FunctionItem = {
  readonly type: "function";
  readonly name: string;
  readonly inputs: readonly {
    readonly name: string;
    readonly type: string;
  }[];
  readonly outputs: readonly { readonly type: string }[];
  readonly state_mutability: "view" | "external";
};

declare type CategorizedFunctions = {
  read: FunctionItem[];
  write: FunctionItem[];
};

//? ============= INTERFACES ============= ?//

declare interface PARENT_WRAPPER {
  children: React.ReactNode;
}

declare interface MAX_WRAPPER extends PARENT_WRAPPER {
  className?: string;
}

declare interface COITON_FLOW extends PARENT_WRAPPER {
  title: string;
  description: string;
  styles: {
    gradient: string;
    color: string;
    border: string;
  };
}

declare interface WALLET_CONNECTOR {
  id: string | undefined;
  name: string | undefined;
  icon:
    | string
    | {
        dark: string;
        light: string;
      }
    | undefined;
}

declare interface WALLET_STORE {
  walletAddress: string | undefined;
  isWalletConnected: boolean | undefined;
  currentConnector: WALLET_CONNECTOR | undefined;
}

declare interface WALLET_STORE_ACTIONS {
  setWalletAddress: (address: string | undefined) => void;
  setIsWalletConnected: (isConnected: boolean | undefined) => void;
  setCurrentConnector: (connector: WALLET_CONNECTOR | undefined) => void;
}

declare interface CONTRACT_STORE {
  validatorId: number | undefined;
  validators: number[];
  transactionReceipt: TransactionReceipt[];
}

declare interface CONTRACT_STORE_ACTIONS {
  setValidatorId: (_id: number | undefined) => void;
  setValidators: (validator: number) => void;
  setTransactionReceipt: (receipt: TransactionReceipt) => void;
}
