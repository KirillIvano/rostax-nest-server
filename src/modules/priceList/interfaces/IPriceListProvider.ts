export interface IPriceListProvider {
    updatePriceList: (file: Buffer, fileName: string) => Promise<void>;
}
