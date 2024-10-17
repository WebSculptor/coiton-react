import { env } from "./envs";
import { type Abi as ABI } from "starknet";

export const contract = {
  contractAddress: env.contract as `0x${string}`,
  erc20Address: env.erc20 as `0x${string}`,
  contractAbi: [
    { type: "impl", name: "DaoImpl", interface_name: "cairo::dao::IDao" },
    {
      type: "struct",
      name: "core::integer::u256",
      members: [
        { name: "low", type: "core::integer::u128" },
        { name: "high", type: "core::integer::u128" },
      ],
    },
    {
      type: "struct",
      name: "core::byte_array::ByteArray",
      members: [
        {
          name: "data",
          type: "core::array::Array::<core::bytes_31::bytes31>",
        },
        { name: "pending_word", type: "core::felt252" },
        { name: "pending_word_len", type: "core::integer::u32" },
      ],
    },
    {
      type: "struct",
      name: "cairo::dao::Listing",
      members: [
        { name: "id", type: "core::integer::u256" },
        { name: "details", type: "core::byte_array::ByteArray" },
        { name: "hash", type: "core::felt252" },
        {
          name: "owner",
          type: "core::starknet::contract_address::ContractAddress",
        },
      ],
    },
    {
      type: "struct",
      name: "cairo::dao::Organization",
      members: [
        { name: "id", type: "core::integer::u256" },
        { name: "name", type: "core::felt252" },
        { name: "region", type: "core::felt252" },
        { name: "validator", type: "core::integer::u256" },
        {
          name: "domain",
          type: "core::starknet::contract_address::ContractAddress",
        },
      ],
    },
    {
      type: "interface",
      name: "cairo::dao::IDao",
      items: [
        {
          type: "function",
          name: "register_validator",
          inputs: [{ name: "validator", type: "core::integer::u256" }],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "create_listing",
          inputs: [
            { name: "details", type: "core::byte_array::ByteArray" },
            { name: "hash", type: "core::felt252" },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "approve_listing",
          inputs: [
            { name: "_id", type: "core::integer::u256" },
            { name: "hash", type: "core::felt252" },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "version",
          inputs: [],
          outputs: [{ type: "core::integer::u16" }],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "get_unapproved_listings",
          inputs: [],
          outputs: [{ type: "core::array::Array::<cairo::dao::Listing>" }],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "get_owner",
          inputs: [],
          outputs: [
            { type: "core::starknet::contract_address::ContractAddress" },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "hash",
          inputs: [{ name: "operand", type: "core::felt252" }],
          outputs: [{ type: "core::felt252" }],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "get_erc20",
          inputs: [],
          outputs: [
            { type: "core::starknet::contract_address::ContractAddress" },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "get_erc721",
          inputs: [],
          outputs: [
            { type: "core::starknet::contract_address::ContractAddress" },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "get_erc1155",
          inputs: [],
          outputs: [
            { type: "core::starknet::contract_address::ContractAddress" },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "get_listings",
          inputs: [],
          outputs: [{ type: "core::array::Array::<cairo::dao::Listing>" }],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "stake_listing_fee",
          inputs: [{ name: "amount", type: "core::felt252" }],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "register_organization",
          inputs: [
            { name: "validator", type: "core::integer::u256" },
            { name: "name", type: "core::felt252" },
            { name: "region", type: "core::felt252" },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "get_organizations",
          inputs: [],
          outputs: [{ type: "core::array::Array::<cairo::dao::Organization>" }],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "get_organization",
          inputs: [
            {
              name: "domain",
              type: "core::starknet::contract_address::ContractAddress",
            },
          ],
          outputs: [{ type: "cairo::dao::Organization" }],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "upgrade",
          inputs: [
            {
              name: "impl_hash",
              type: "core::starknet::class_hash::ClassHash",
            },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "set_erc1155",
          inputs: [
            {
              name: "address",
              type: "core::starknet::contract_address::ContractAddress",
            },
          ],
          outputs: [],
          state_mutability: "external",
        },
      ],
    },
    {
      type: "constructor",
      name: "constructor",
      inputs: [
        {
          name: "owner",
          type: "core::starknet::contract_address::ContractAddress",
        },
        {
          name: "erc20_address",
          type: "core::starknet::contract_address::ContractAddress",
        },
        {
          name: "erc1155_address",
          type: "core::starknet::contract_address::ContractAddress",
        },
        {
          name: "erc721_address",
          type: "core::starknet::contract_address::ContractAddress",
        },
      ],
    },
    {
      type: "event",
      name: "cairo::dao::dao::Upgraded",
      kind: "struct",
      members: [
        {
          name: "implementation",
          type: "core::starknet::class_hash::ClassHash",
          kind: "data",
        },
      ],
    },
    {
      type: "event",
      name: "cairo::dao::dao::Event",
      kind: "enum",
      variants: [
        {
          name: "Upgraded",
          type: "cairo::dao::dao::Upgraded",
          kind: "nested",
        },
      ],
    },
  ] as const satisfies ABI,
  erc20Abi: [
    {
      type: "impl",
      name: "UpgradeableImpl",
      interface_name: "openzeppelin_upgrades::interface::IUpgradeable",
    },
    {
      type: "interface",
      name: "openzeppelin_upgrades::interface::IUpgradeable",
      items: [
        {
          type: "function",
          name: "upgrade",
          inputs: [
            {
              name: "new_class_hash",
              type: "core::starknet::class_hash::ClassHash",
            },
          ],
          outputs: [],
          state_mutability: "external",
        },
      ],
    },
    {
      type: "struct",
      name: "core::integer::u256",
      members: [
        {
          name: "low",
          type: "core::integer::u128",
        },
        {
          name: "high",
          type: "core::integer::u128",
        },
      ],
    },
    {
      type: "function",
      name: "burn",
      inputs: [
        {
          name: "value",
          type: "core::integer::u256",
        },
      ],
      outputs: [],
      state_mutability: "external",
    },
    {
      type: "function",
      name: "mint",
      inputs: [
        {
          name: "recipient",
          type: "core::starknet::contract_address::ContractAddress",
        },
        {
          name: "amount",
          type: "core::integer::u256",
        },
      ],
      outputs: [],
      state_mutability: "external",
    },
    {
      type: "impl",
      name: "ERC20MixinImpl",
      interface_name: "openzeppelin_token::erc20::interface::ERC20ABI",
    },
    {
      type: "enum",
      name: "core::bool",
      variants: [
        {
          name: "False",
          type: "()",
        },
        {
          name: "True",
          type: "()",
        },
      ],
    },
    {
      type: "struct",
      name: "core::byte_array::ByteArray",
      members: [
        {
          name: "data",
          type: "core::array::Array::<core::bytes_31::bytes31>",
        },
        {
          name: "pending_word",
          type: "core::felt252",
        },
        {
          name: "pending_word_len",
          type: "core::integer::u32",
        },
      ],
    },
    {
      type: "interface",
      name: "openzeppelin_token::erc20::interface::ERC20ABI",
      items: [
        {
          type: "function",
          name: "total_supply",
          inputs: [],
          outputs: [
            {
              type: "core::integer::u256",
            },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "balance_of",
          inputs: [
            {
              name: "account",
              type: "core::starknet::contract_address::ContractAddress",
            },
          ],
          outputs: [
            {
              type: "core::integer::u256",
            },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "allowance",
          inputs: [
            {
              name: "owner",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              name: "spender",
              type: "core::starknet::contract_address::ContractAddress",
            },
          ],
          outputs: [
            {
              type: "core::integer::u256",
            },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "transfer",
          inputs: [
            {
              name: "recipient",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              name: "amount",
              type: "core::integer::u256",
            },
          ],
          outputs: [
            {
              type: "core::bool",
            },
          ],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "transfer_from",
          inputs: [
            {
              name: "sender",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              name: "recipient",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              name: "amount",
              type: "core::integer::u256",
            },
          ],
          outputs: [
            {
              type: "core::bool",
            },
          ],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "approve",
          inputs: [
            {
              name: "spender",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              name: "amount",
              type: "core::integer::u256",
            },
          ],
          outputs: [
            {
              type: "core::bool",
            },
          ],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "name",
          inputs: [],
          outputs: [
            {
              type: "core::byte_array::ByteArray",
            },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "symbol",
          inputs: [],
          outputs: [
            {
              type: "core::byte_array::ByteArray",
            },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "decimals",
          inputs: [],
          outputs: [
            {
              type: "core::integer::u8",
            },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "totalSupply",
          inputs: [],
          outputs: [
            {
              type: "core::integer::u256",
            },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "balanceOf",
          inputs: [
            {
              name: "account",
              type: "core::starknet::contract_address::ContractAddress",
            },
          ],
          outputs: [
            {
              type: "core::integer::u256",
            },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "transferFrom",
          inputs: [
            {
              name: "sender",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              name: "recipient",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              name: "amount",
              type: "core::integer::u256",
            },
          ],
          outputs: [
            {
              type: "core::bool",
            },
          ],
          state_mutability: "external",
        },
      ],
    },
    {
      type: "impl",
      name: "OwnableMixinImpl",
      interface_name: "openzeppelin_access::ownable::interface::OwnableABI",
    },
    {
      type: "interface",
      name: "openzeppelin_access::ownable::interface::OwnableABI",
      items: [
        {
          type: "function",
          name: "owner",
          inputs: [],
          outputs: [
            {
              type: "core::starknet::contract_address::ContractAddress",
            },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "transfer_ownership",
          inputs: [
            {
              name: "new_owner",
              type: "core::starknet::contract_address::ContractAddress",
            },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "renounce_ownership",
          inputs: [],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "transferOwnership",
          inputs: [
            {
              name: "newOwner",
              type: "core::starknet::contract_address::ContractAddress",
            },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "renounceOwnership",
          inputs: [],
          outputs: [],
          state_mutability: "external",
        },
      ],
    },
    {
      type: "constructor",
      name: "constructor",
      inputs: [
        {
          name: "owner",
          type: "core::starknet::contract_address::ContractAddress",
        },
      ],
    },
    {
      type: "event",
      name: "openzeppelin_token::erc20::erc20::ERC20Component::Transfer",
      kind: "struct",
      members: [
        {
          name: "from",
          type: "core::starknet::contract_address::ContractAddress",
          kind: "key",
        },
        {
          name: "to",
          type: "core::starknet::contract_address::ContractAddress",
          kind: "key",
        },
        {
          name: "value",
          type: "core::integer::u256",
          kind: "data",
        },
      ],
    },
    {
      type: "event",
      name: "openzeppelin_token::erc20::erc20::ERC20Component::Approval",
      kind: "struct",
      members: [
        {
          name: "owner",
          type: "core::starknet::contract_address::ContractAddress",
          kind: "key",
        },
        {
          name: "spender",
          type: "core::starknet::contract_address::ContractAddress",
          kind: "key",
        },
        {
          name: "value",
          type: "core::integer::u256",
          kind: "data",
        },
      ],
    },
    {
      type: "event",
      name: "openzeppelin_token::erc20::erc20::ERC20Component::Event",
      kind: "enum",
      variants: [
        {
          name: "Transfer",
          type: "openzeppelin_token::erc20::erc20::ERC20Component::Transfer",
          kind: "nested",
        },
        {
          name: "Approval",
          type: "openzeppelin_token::erc20::erc20::ERC20Component::Approval",
          kind: "nested",
        },
      ],
    },
    {
      type: "event",
      name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
      kind: "struct",
      members: [
        {
          name: "previous_owner",
          type: "core::starknet::contract_address::ContractAddress",
          kind: "key",
        },
        {
          name: "new_owner",
          type: "core::starknet::contract_address::ContractAddress",
          kind: "key",
        },
      ],
    },
    {
      type: "event",
      name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
      kind: "struct",
      members: [
        {
          name: "previous_owner",
          type: "core::starknet::contract_address::ContractAddress",
          kind: "key",
        },
        {
          name: "new_owner",
          type: "core::starknet::contract_address::ContractAddress",
          kind: "key",
        },
      ],
    },
    {
      type: "event",
      name: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
      kind: "enum",
      variants: [
        {
          name: "OwnershipTransferred",
          type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
          kind: "nested",
        },
        {
          name: "OwnershipTransferStarted",
          type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
          kind: "nested",
        },
      ],
    },
    {
      type: "event",
      name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
      kind: "struct",
      members: [
        {
          name: "class_hash",
          type: "core::starknet::class_hash::ClassHash",
          kind: "data",
        },
      ],
    },
    {
      type: "event",
      name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
      kind: "enum",
      variants: [
        {
          name: "Upgraded",
          type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
          kind: "nested",
        },
      ],
    },
    {
      type: "event",
      name: "cairo::erc20::erc20::Event",
      kind: "enum",
      variants: [
        {
          name: "ERC20Event",
          type: "openzeppelin_token::erc20::erc20::ERC20Component::Event",
          kind: "flat",
        },
        {
          name: "OwnableEvent",
          type: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
          kind: "flat",
        },
        {
          name: "UpgradeableEvent",
          type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
          kind: "flat",
        },
      ],
    },
  ] as const satisfies ABI,
};
