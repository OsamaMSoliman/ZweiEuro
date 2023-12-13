// https://github.com/FirebaseExtended/reactfire/blob/f768f4d3c3be4ab5a3611143b8ceda19ede1dc95/docs/use.md#cloud-storage-for-firebase

import { useRef, useState } from "react";
import { Button, Col, Container, Form, FloatingLabel, InputGroup, Row, Badge } from "react-bootstrap";
import { useDatabase, useStorage } from "reactfire";
import { uploadCoinData } from "../firebase/utils/fireRealTimeDatabase";
import { uploadCoinImg } from "../firebase/utils/fireStorage";
import { CoinData } from "../interfaces";
import { useTranslation } from "react-i18next";

const maxAllowedFileSizeInMB = 0.25;

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
    const [uploadCount, setUploadCount] = useState<number>(0);
    const [uploadFile, setUploadFile] = useState<File>();
    const didfileExceedMaxSize = uploadFile && uploadFile?.size > 1024 * 1024 * maxAllowedFileSizeInMB;

    const [t] = useTranslation();
    const fireDB = useDatabase();
    const fireStorgate = useStorage();

    function handleUpload(formData: FormData, OnSuccessCallback: Function) {
        const coinData: CoinData = {
            year: Number(formData.get("year")),
            collection: {
                A: Number(formData.get("A")),
                D: Number(formData.get("D")),
                F: Number(formData.get("F")),
                G: Number(formData.get("G")),
                J: Number(formData.get("J")),
            },
            description: "", //TODO ?
        };

        const coinId = uploadCoinData(fireDB, coinData);
        uploadCoinImg(fireStorgate, coinId, formData.get("imgFile") as File);

        OnSuccessCallback();
    }


    return (
        <Container className="d-flex flex-column justify-content-center h-100">
            <div className="d-flex align-items-start">
                <h1>{t("upload_title")} </h1>
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
                <Row md={2} xs={1} className="h-100 g-2">
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                        <input
                            className="d-none"
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            name="imgFile" required
                            onChange={(/*event:any */) =>
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
                                <i className="bi bi-exclamation-triangle text-danger">{t('file-size-warning')}</i>
                            </div>
                        )}
                        <div>
                            {t('max allow size')}: {maxAllowedFileSizeInMB} MB
                        </div>
                        {uploadFile && (
                            <>
                                <div>
                                    {t('File Name')}: {uploadFile?.name}
                                </div>
                                <div>
                                    {t('File Size')}: {formatBytes(uploadFile?.size)}
                                </div>
                            </>
                        )}
                    </Col>
                    <Col>
                        <Form.Floating className="mb-3">
                            <Form.Control size="lg" name="year" type="number" placeholder="1999" required />
                            <Form.Label>{t("Year")}: </Form.Label>
                        </Form.Floating>
                        <Form.Group className="mb-3" >
                            <Form.Label>{t("Collected coins (default 0)")}: </Form.Label>
                            <InputGroup>
                                {/* <FloatingLabel className="text-center" label="A"> */}
                                <Form.Control name="A" className="text-center" type="number" placeholder="A" />
                                {/* </FloatingLabel> */}
                                <Form.Control name="D" className="text-center" type="number" placeholder="D" />
                                <Form.Control name="F" className="text-center" type="number" placeholder="F" />
                                <Form.Control name="G" className="text-center" type="number" placeholder="G" />
                                <Form.Control name="J" className="text-center" type="number" placeholder="J" />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Row>
            </Form>
        </Container>
    );
}