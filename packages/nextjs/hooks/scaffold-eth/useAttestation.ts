import { DataLocationOnChain, IndexService, AttestationInfo } from '@ethsign/sp-sdk';
import { decodeOnChainData } from '@ethsign/sp-sdk';


export const useAttestation = () => {
    const indexService = new IndexService("testnet");

    const getAttestationList = async (schemaId: string, indexingValue: string, page: number = 1) => {
        return await indexService.queryAttestationList({ schemaId, page, indexingValue });
    };

    const getDecodedData = (data: string, schemaData: string) => {
        return decodeOnChainData(
            data,
            DataLocationOnChain.ONCHAIN,
            JSON.parse(schemaData)
        )
    }

    const getProductManufactureAttestation = async (indexingValue: string) => {
        const schemaId = "onchain_evm_84532_0x45f";
        const attestationList = await getAttestationList(schemaId, indexingValue);
        console.log("attestationList", attestationList);

        const schemaData = '[{"name":"id","type":"string"},{"name":"pbtAddressWithChainId","type":"string"},{"name":"brand","type":"string"},{"name":"model","type":"string"},{"name":"ownerAddress","type":"string"},{"name":"timestamp","type":"uint256"}]';
        return attestationList?.rows.map(attestation => {
            const decodedData = getDecodedData(attestation.data, schemaData);
            return {
                ...attestation,
                decodedData,
                type: 'manufacture'
            }
        });
    };

    const getProductTransferAttestation = async (indexingValue: string) => {
        const schemaId = "onchain_evm_84532_0x460";
        const schemaData = '[{"name": "id","type": "string"},{"name": "pbtAddressWithChainId","type": "string"},{"name": "chipAddress","type": "address"},{"name": "fromAddress","type": "string"},{"name": "toAddress","type": "string"},{"name": "price","type": "uint256"},{"name": "timestamp","type": "uint256"}]';

        const attestationList = await getAttestationList(schemaId, indexingValue);
        return attestationList?.rows.map(attestation => {
            const decodedData = getDecodedData(attestation.data, schemaData);
            return {
                ...attestation,
                decodedData,
                type: 'transfer'
            }
        });
    }

    const getProductRecordAttestation = async (indexingValue: string) => {
        const schemaId = "onchain_evm_84532_0x461";
        const schemaData = '[{"name":"id","type":"string"},{"name":"pbtAddressWithChainId","type":"string"},{"name":"ownerAddress","type":"string"},{"name":"cid","type":"string"},{"name":"textRecord","type":"string"},{"name":"timestamp","type":"uint256"}]';
        
        const attestationList = await getAttestationList(schemaId, indexingValue);
        
        return attestationList?.rows.map(attestation => {
            const decodedData = getDecodedData(attestation.data, schemaData);
            return {
                ...attestation,
                decodedData,
                type: 'record'
            }
        });
    }

    return {
        getProductManufactureAttestation,
        getProductTransferAttestation,
        getProductRecordAttestation,
        getDecodedData
    };
};