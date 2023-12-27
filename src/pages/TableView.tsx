import { useDatabase, useDatabaseObjectData } from 'reactfire';
import { getBaseDBUploadRef } from '../firebase/utils/fireRealTimeDatabase';
import { CoinCategorys, ICoinData } from '../interfaces';
import { Navigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { HeaderHeight } from '../components/Header';

export default function TableView() {
    const [t] = useTranslation();
    const baseUploadRef = getBaseDBUploadRef(useDatabase());
    const { data, status, error } = useDatabaseObjectData<{ [key: string]: ICoinData }>(baseUploadRef);

    if (status === "error")
        console.log(error);

    const { NO_ID_FIELD, ...coinObjs } = data ?? {};
    const coins = Object.values(coinObjs ?? {});

    // if not loading and database is empty, auto-direct to Upload
    if (status !== "loading" && coins.length === 0)
        return <Navigate to={"/upload"} replace={true} />

    return (
        <Table bordered className='text-center'>
            <thead className='sticky-top' style={{ top: HeaderHeight }}>
                <tr>
                    <th rowSpan={2} className='align-middle'>{t("table-view.id")}</th>
                    <th rowSpan={2} className='align-middle'>{t("table-view.title")}</th>
                    <th rowSpan={2} className='align-middle'>{t("table-view.description")}</th>
                    <th rowSpan={2} className='align-middle'>{t("table-view.year")}</th>
                    <th colSpan={5} className='text-center' >{t("table-view.collection")}</th>
                    <th rowSpan={2} className='align-middle'>{t("table-view.category")}</th>
                    <th rowSpan={2} className='align-middle'>{t("table-view.modifiedBy")}</th>
                </tr>
                <tr>
                    <th>A</th>
                    <th>D</th>
                    <th>F</th>
                    <th>G</th>
                    <th>J</th>
                </tr>
            </thead>
            <tbody>
                {coins.map(coin => (
                    <tr key={coin.id}>
                        <td>{coin.id}</td>
                        <td>{coin.title}</td>
                        <td>{coin.description}</td>
                        <td>{coin.year}</td>
                        {
                            Object.values(coin.collection).map((value, idx, collection) => (
                                <td key={idx} colSpan={collection.length === 1 ? 5 : 1}>{value}</td>
                            ))
                        }
                        <td>{CoinCategorys[coin.category]}</td>
                        <td>{coin.modifiedBy}</td>
                    </tr>
                ))}
            </tbody>
        </Table >
    );
}



