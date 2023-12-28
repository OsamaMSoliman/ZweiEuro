// https://github.com/FirebaseExtended/reactfire/blob/f768f4d3c3be4ab5a3611143b8ceda19ede1dc95/docs/use.md#cloud-storage-for-firebase

import { ChangeEvent, useRef, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row, Badge, FloatingLabel } from "react-bootstrap";
import { useDatabase, useStorage } from "reactfire";
import { uploadCoinData } from "../firebase/utils/fireRealTimeDatabase";
import { uploadCoinImg } from "../firebase/utils/fireStorage";
import { TCategory, CoinCategorys, ICoinData } from "../interfaces";
import { useTranslation } from "react-i18next";
import { getAuth } from "firebase/auth";

const maxAllowedFileSizeInMB = 0.5;

const formatBytes = (bytes: number, decimals = 2): string => {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};


export default function Upload() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [wasValidated, setWasValidated] = useState(false);
    const [isNotDeCoin, setIsNotDeCoin] = useState(false);
    const [uploadCount, setUploadCount] = useState<number>(0);
    const [uploadFile, setUploadFile] = useState<File>();
    const didfileExceedMaxSize = uploadFile && uploadFile?.size > 1024 * 1024 * maxAllowedFileSizeInMB;

    const [t] = useTranslation();
    const fireDB = useDatabase();
    const fireStorgate = useStorage();

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        setIsNotDeCoin(event.target.value === "Anderes" satisfies TCategory);
    }

    function handleUpload(formData: FormData, OnSuccessCallback: Function) {
        const coinData: ICoinData = {
            title: formData.get("title") as string,
            description: String(formData.get("description") ?? ""),
            year: Number(formData.get("year")),
            collection: isNotDeCoin ?
                {
                    X: Number(formData.get("count"))
                } : {
                    A: Number(formData.get("A")),
                    D: Number(formData.get("D")),
                    F: Number(formData.get("F")),
                    G: Number(formData.get("G")),
                    J: Number(formData.get("J")),
                },
            category: formData.get("category") as TCategory,
            modifiedBy: getAuth().currentUser?.displayName ?? ""
        };

        const coinId = uploadCoinData(fireDB, coinData);
        uploadCoinImg(fireStorgate, coinId, formData.get("imgFile") as File);

        OnSuccessCallback();
    }

    const categoryOptions = Object.entries(CoinCategorys).map(([key, value]) => (
        <option key={key} value={key}>{value}</option>
    ));

    return (
        <Container className="d-flex flex-column justify-content-center h-100">
            <div className="d-flex align-items-start">
                <h1>{t("upload-page.title")} </h1>
                {uploadCount > 0 && <Badge pill bg="success">{uploadCount}</Badge>}
            </div>
            <Form
                noValidate validated={wasValidated}
                onSubmit={(event) => {
                    event.preventDefault();
                    setWasValidated(true);
                    const form = event.currentTarget;;
                    if (form.checkValidity() && !didfileExceedMaxSize)
                        handleUpload(new FormData(form), () => {
                            setUploadCount(prev_value => prev_value + 1);
                            setWasValidated(false);
                            setUploadFile(undefined);
                            form.reset();
                        });
                }}
            >
                <Row md={2} sm={1} className="h-100 g-2">
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                        <input
                            className="d-none"
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            name="imgFile" required
                            onChange={(/*event: ChangeEvent<HTMLInputElement> */) =>
                                // event.target?.files?.[0] == fileInputRef.current?.files?.[0]
                                setUploadFile(fileInputRef.current?.files?.[0])
                            }
                        />
                        <Button
                            className="rounded-circle p-4"
                            onClick={() => fileInputRef.current?.click()}
                            variant={wasValidated && (!uploadFile || didfileExceedMaxSize) ? "danger" : "primary"}
                        >
                            <i className="bi bi-cloud-upload" />
                        </Button>
                        {didfileExceedMaxSize && (
                            <div>
                                <i className="bi bi-exclamation-triangle text-danger">{t('upload-page.file-size-warning')}</i>
                            </div>
                        )}
                        <div>
                            {t('upload-page.max-allow-size')}: {maxAllowedFileSizeInMB} MB
                        </div>
                        {uploadFile && (
                            <>
                                <div>
                                    {t('upload-page.file-name')}: {uploadFile?.name}
                                </div>
                                <div>
                                    {t('upload-page.file-size')}: {formatBytes(uploadFile?.size)}
                                </div>
                            </>
                        )}
                    </Col>
                    <Col>
                        <FloatingLabel label={t("upload-page.coin-category")} className="mb-3">
                            <Form.Select name="category" className="mb-3" placeholder="" onChange={onSelectChange}>
                                {categoryOptions}
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel label={t("upload-page.coin-title")} className="mb-3">
                            <Form.Control name="title" type="text" placeholder="" required />
                        </FloatingLabel>
                        <Form.Floating className="mb-3">
                            <Form.Control size="lg" name="year" type="number" placeholder="" required />
                            <Form.Label>{t("upload-page.year")}: </Form.Label>
                        </Form.Floating>
                        <Form.Group className="mb-3" >
                            <Form.Label>{t("upload-page.collected-coins-with-default")}: </Form.Label>
                            {isNotDeCoin ?
                                <Form.Control name="count" className="text-center" type="number" placeholder={t("upload-page.count")} />
                                :
                                <InputGroup>
                                    <Form.Control name="A" className="text-center" type="number" placeholder="A" />
                                    <Form.Control name="D" className="text-center" type="number" placeholder="D" />
                                    <Form.Control name="F" className="text-center" type="number" placeholder="F" />
                                    <Form.Control name="G" className="text-center" type="number" placeholder="G" />
                                    <Form.Control name="J" className="text-center" type="number" placeholder="J" />
                                </InputGroup>
                            }
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>{t("upload-page.coin-description")}:</Form.Label>
                            <Form.Control name="description" as="textarea" rows={2} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Button variant="primary" type="submit">
                        {t("upload-page.submit-btn")}
                    </Button>
                </Row>
            </Form>
        </Container>
    );
}