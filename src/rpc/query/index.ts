import {
  Account,
  Block,
  Coin,
  IndexedTx,
  StargateClient,
} from '@cosmjs/stargate'
import {
  Comet38Client,
  TxSearchResponse,
  ValidatorsResponse,
} from '@cosmjs/tendermint-rpc'

export async function getChainId(tmClient: Comet38Client): Promise<string> {
  const client = await StargateClient.create(tmClient)
  return client.getChainId()
}

export async function getValidators(
  tmClient: Comet38Client
): Promise<ValidatorsResponse> {
  return tmClient.validatorsAll()
}
export async function getValidatorPagination(
  tmClient: Comet38Client,
  page: number,
  perPage: number
): Promise<ValidatorsResponse> {
  return tmClient.validators({
    page: page,
    per_page: perPage,
  })
}

export async function getBlock(
  tmClient: Comet38Client,
  height: number
): Promise<Block> {
  const client = await StargateClient.create(tmClient)
  return client.getBlock(height)
}

export async function getTx(
  tmClient: Comet38Client,
  hash: string
): Promise<IndexedTx | null> {
  const client = await StargateClient.create(tmClient)
  return client.getTx(hash)
}

export async function getAccount(
  tmClient: Comet38Client,
  address: string
): Promise<Account | null> {
  const client = await StargateClient.create(tmClient)
  return client.getAccount(address)
}

export async function getAllBalances(
  tmClient: Comet38Client,
  address: string
): Promise<readonly Coin[]> {
  const client = await StargateClient.create(tmClient)
  return client.getAllBalances(address)
}

export async function getBalanceStaked(
  tmClient: Comet38Client,
  address: string
): Promise<Coin | null> {
  const client = await StargateClient.create(tmClient)
  return client.getBalanceStaked(address)
}

export async function getTxsBySender(
  tmClient: Comet38Client,
  address: string,
  page: number,
  perPage: number
): Promise<TxSearchResponse> {
  return tmClient.txSearch({
    query: `message.sender='${address}'`,
    prove: true,
    order_by: 'desc',
    page: page,
    per_page: perPage,
  })
}
