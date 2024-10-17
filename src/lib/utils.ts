import { BN } from "bn.js";
import BNType from "bn.js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toBN } from "./dontpanicdao";
import {
  feltArrToStr,
  shortStringFeltToStr,
  strToFeltArr,
  strToShortStringFelt,
} from "./cairoStringUtils.sekaiStudio";
import { byteArray, ByteArray } from "starknet";

const FELT_MAX_VAL = new BN(
  "3618502788666131106986593281521497120414687020801267626233049500247285301248",
  10,
);

const DEFAULT_RESULT_OBJECT = {
  output: null,
  isValid: true,
};

export interface ConvertOutput<T> {
  output: T;
  isValid: boolean | null;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateAddr(str: string | undefined, n: number = 6): string {
  if (!str) return "";
  return str?.length > n
    ? str.slice(0, n) + "..." + str.slice(str.length - 4)
    : str;
}

export function generateValidatorId(length: number): number {
  const upperLimit = Math.pow(10, length) - 1;
  const lowerLimit = Math.pow(10, length - 1);

  return Math.floor(Math.random() * (upperLimit - lowerLimit + 1)) + lowerLimit;
}

export function toBigNumber(input: any): BNType | null {
  const number = toBN(input);
  return BN.isBN(number) ? number : null;
}

export function decimalToFelt(input: string): ConvertOutput<BNType | null> {
  const inputInt = Number(input);
  if (isNaN(inputInt)) {
    return DEFAULT_RESULT_OBJECT;
  }
  const value = toBigNumber(input);
  return {
    output: value,
    isValid: value ? value.lt(FELT_MAX_VAL) : null,
  };
}

export function shortStringToFelt(input: string): ConvertOutput<BNType | null> {
  if (typeof input !== "string" || input === "") {
    return DEFAULT_RESULT_OBJECT;
  }

  const value = strToShortStringFelt(input);
  const valueBN = toBigNumber(value.toString());
  return {
    output: valueBN ? valueBN : null,
    isValid: valueBN ? valueBN.lt(FELT_MAX_VAL) : null,
  };
}

export function feltToShortString(input: string): ConvertOutput<string | null> {
  const inputInt = Number(input);
  if (isNaN(inputInt)) {
    return DEFAULT_RESULT_OBJECT;
  }
  const number = BigInt(input);
  const value = shortStringFeltToStr(number);
  const numberBN = toBigNumber(value);
  return {
    output: value,
    isValid: numberBN ? numberBN.lt(FELT_MAX_VAL) : null,
  };
}

export function stringToFeltArray(
  input: string,
): ConvertOutput<string[] | null> {
  const value = strToFeltArr(input).map((val) => val.toString());
  return {
    output: value ? value : null,
    isValid: true,
  };
}

export function feltArrayToString(input: string): ConvertOutput<string | null> {
  if (typeof input !== "string" || input === "") {
    return DEFAULT_RESULT_OBJECT;
  }
  const valueArr = input
    .replaceAll(" ", "")
    .split(",")
    .map((val) => BigInt(val));
  const value = feltArrToStr(valueArr);
  return {
    output: value ? value : null,
    isValid: true,
  };
}

export function stringToByteArray(data: string) {
  const obj = JSON.parse(data);
  const jsonString = JSON.stringify(obj);
  return byteArray.byteArrayFromString(jsonString);
}

// Function to convert Starknet ByteArray back to original value
export function byteArrayToString(data: ByteArray) {
  const jsonString = byteArray.stringFromByteArray(data);
  return JSON.parse(jsonString);
}

export function generateRandomListings() {
  const cities = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Luxor",
    "Aswan",
    "Hurghada",
    "Sharm El Sheikh",
    "Dahab",
    "Siwa",
    "Marsa Matruh",
    "Suez",
    "Port Said",
    "Ismailia",
    "El Gouna",
  ];

  const areas = [
    "Downtown",
    "Waterfront",
    "Suburb",
    "City Center",
    "Historical District",
    "Old Town",
    "Financial District",
    "Beachfront",
    "Mountain View",
    "Residential Area",
    "Industrial Zone",
    "Countryside",
    "Seaside Village",
    "Urban Park",
  ];

  const ownerNames = [
    "John Doe",
    "Jane Smith",
    "Ahmed Hassan",
    "Sara Mohamed",
    "Omar Ali",
    "Mona Khalil",
    "Youssef Karim",
    "Layla Hussein",
    "Hassan Fathy",
    "Fatima El-Sayed",
    "Kareem Naguib",
    "Nadia Saad",
    "Sami Hani",
    "Noor Abdallah",
  ];

  const randomAmenities = () => {
    const all = [
      "WiFi",
      "Air Conditioning",
      "Swimming Pool",
      "Gym",
      "Parking",
      "Laundry",
      "Pets Allowed",
      "Cable TV",
      "Heating",
      "Balcony",
      "Garden",
      "BBQ Area",
      "Fireplace",
      "Concierge Service",
      "Bicycle Rental",
      "Room Service",
      "Spa",
      "Hot Tub",
      "Tennis Court",
      "Electric Vehicle Charger",
    ];
    return all.filter(() => Math.random() > 0.3);
  };

  const randomDate = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime()),
    )
      .toISOString()
      .split("T")[0];
  };

  const randomDescription = () => {
    const propertyTypes = [
      "apartment",
      "villa",
      "studio",
      "penthouse",
      "townhouse",
    ];
    const adjectives = [
      "spacious",
      "cozy",
      "modern",
      "luxurious",
      "charming",
      "elegant",
      "stylish",
    ];
    const views = ["cityscape", "sea", "garden", "mountain", "pool"];
    const nearby = [
      "shopping malls",
      "restaurants",
      "public transport",
      "schools",
      "parks",
      "beaches",
      "nightlife",
    ];

    // Randomly select items from each array
    const city = cities[Math.floor(Math.random() * cities.length)];
    const area = areas[Math.floor(Math.random() * areas.length)];
    const ownerName = ownerNames[Math.floor(Math.random() * ownerNames.length)];
    const propertyType =
      propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const view = views[Math.floor(Math.random() * views.length)];
    const amenities = randomAmenities();
    const nearbyLocation = nearby[Math.floor(Math.random() * nearby.length)];

    return `Discover a ${adjective} ${propertyType} located in the heart of ${city}, in the ${area} area. This property offers stunning ${view} views and includes amenities such as ${amenities.join(
      ", ",
    )}. Perfect for those who want to be close to ${nearbyLocation}. Contact ${ownerName} today to arrange a viewing!`;
  };

  const city = cities[Math.floor(Math.random() * cities.length)];
  const area = areas[Math.floor(Math.random() * areas.length)];

  const listingDetails = {
    title: `${city} Apartment`,
    price: Math.floor(Math.random() * 4000) + 1000,
    description: randomDescription(),
    location: `${area} ${city}`,
    amenities: randomAmenities(),
    images: Array(Math.floor(Math.random() * 8))
      .fill(null)
      .map(
        (_) =>
          `https://picsum.photos/${Math.floor(
            Math.random() * 250,
          )}/${Math.floor(Math.random() * 350)}`,
      ),
    owner: {
      name: ownerNames[Math.floor(Math.random() * ownerNames.length)],
      contact: `owner${Math.floor(Math.random() * 100)}@example.com`,
      phone: `+20 ${Math.floor(Math.random() * 1000)} ${Math.floor(
        Math.random() * 1000,
      )} ${Math.floor(Math.random() * 10000)}`,
    },
    availability: {
      availableFrom: randomDate("2024-10-15", "2024-12-31"),
      availableTo: randomDate("2025-01-01", "2025-12-31"),
    },
    size: {
      area: Math.floor(Math.random() * 150) + 50,
      bedrooms: Math.floor(Math.random() * 4) + 1,
      bathrooms: Math.floor(Math.random() * 3) + 1,
    },
    optionalFeatures: {
      furnished: Math.random() > 0.5,
      petFriendly: Math.random() > 0.5,
      smokingAllowed: Math.random() > 0.7,
    },
    ratings: {
      averageRating: Number((Math.random() * 2 + 3).toFixed(1)),
      numberOfReviews: Math.floor(Math.random() * 50) + 1,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return listingDetails;
}

export function bigintReplacer(_key: string, value: any) {
  if (typeof value === "bigint") {
    return value.toString(); // Convert BigInt to string
  }
  return value; // Return other types unchanged
}

export function serializeData(data: any): any {
  // If the value is an array, serialize each item
  if (Array.isArray(data)) {
    return data.map(serializeData);
  }

  // If the value is an object, serialize each key-value pair
  if (data !== null && typeof data === "object") {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, serializeData(value)]),
    );
  }

  // For all other data types, return the value as is
  return data;
}
