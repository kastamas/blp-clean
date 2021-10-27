import { ApiMethod, BaseApi, buildApiHooks } from '@flexypw/react-tools';
import type { AddressResponseDto } from '@flexypw/address';

export class AddressApi extends BaseApi {
  @ApiMethod()
  public getAddressSuggestions(query: string): Promise<AddressResponseDto[]> {
    return this.client.get('/address', {
      params: { query },
    });
  }
}

const { useGetAddressSuggestions } = buildApiHooks(AddressApi);

export { useGetAddressSuggestions };
