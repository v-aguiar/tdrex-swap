import { BigNumber, ethers } from "ethers";
import { contract, tokenContract } from "./contract";
import { toEth } from "./ether-utils";

// TODO -> change to swapERC20TokensForERC1155Tokens
/**
 *
 * uint amountIn,
 * uint amountOutMin,
 * address[] calldata path,
 * uint id, // ERC1155 id.
 * address to,
 * uint deadline
 *
 */
export async function swapERC20TokensForERC1155Tokens(
  amountIn,
  amountOut,
  path,
  erc1155Id,
  toAddress,
  deadline
) {
  try {
    const contractObj = await contract();
    const data = await contractObj.swapERC20TokensForERC1155Tokens(
      toWei(amountIn),
      toWei(amountOut),
      path,
      erc1155Id,
      toAddress,
      deadline
    );

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function hasValidAllowance(owner, tokenName, amount) {
  try {
    const contractObj = await contract();
    const address = await contractObj.getTokenAddress(tokenName);

    const tokenContractObj = await tokenContract(address);
    const data = await tokenContractObj.allowance(
      owner,
      "0xc7a7651483c9a62d6f7b2baa86cd4708fab66017"
    );

    const result = BigNumber.from(data.toString()).gte(
      BigNumber.from(toWei(amount))
    );

    return result;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

// TODO -> change to swapERC1155TokensForERC20Tokens
/**
 *
 * uint amountIn,
 * uint amountOutMin,
 * address[] calldata path,
 * uint id, // ERC1155 id.
 * address to,
 * uint deadline
 *
 */
export async function swapERC1155TokensForERC20Tokens(
  amountIn,
  amountOutMin,
  path,
  erc1155Id,
  toAddress,
  deadline
) {
  try {
    const contractObj = await contract();
    const data = await contractObj.swapERC1155TokensForERC20Tokens(
      toWei(amountIn),
      toWei(amountOutMin),
      path,
      erc1155Id,
      toAddress,
      deadline
    );

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function swapTokenToToken(srcToken, destToken, amount) {
  try {
    const contractObj = await contract();
    const data = await contractObj.swapTokenToToken(
      srcToken,
      destToken,
      toWei(amount)
    );

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function getTokenBalance(tokenName, address) {
  const contractObj = await contract();
  const balance = contractObj.getBalance(tokenName, address);
  return balance;
}

export async function getTokenAddress(tokenName) {
  try {
    const contractObj = await contract();
    const address = await contractObj.getTokenAddress(tokenName);
    return address;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function increaseAllowance(tokenName, amount) {
  try {
    const contractObj = await contract();
    const address = await contractObj.getTokenAddress(tokenName);

    const tokenContractObj = await tokenContract(address);
    const data = await tokenContractObj.approve(
      "0xc7a7651483c9a62d6f7b2baa86cd4708fab66017",
      toWei(amount)
    );

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function getAmounOut(amountIn, reserveIn, reserveOut) {
  try {
    const contractObj = await contract();
    const data = await contractObj.getAmountOut(
      toWei(amountIn),
      toWei(reserveIn),
      toWei(reserveOut)
    );

    return data;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

function toWei(amount) {
  const toWei = ethers.utils.parseUnits(amount.toString());
  return toWei.toString();
}

function parseErrorMsg(e) {
  const json = JSON.parse(JSON.stringify(e));
  return json?.reason || json?.error?.message;
}
