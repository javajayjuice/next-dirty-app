import React from "react";
import { AppProps } from 'next/app';
import './styles.css'
import { UserProvider } from "../providers/user";
import { AddressProvider } from "../providers/details/address";
import { ParentProvider } from "../providers/details/parent";
import { SubjectProvider } from "../providers/details/subject";
import { ApplicationProvider } from "../providers/application";
import { InstitutionProvider } from "../providers/application/institution";
import { CampusProvider } from "../providers/application/campus";
import { InstituteFacultyProvider } from "../providers/application/instituteFaculty";
import { CourseProvider } from "../providers/application/course";
import { ApplicantSubjectProvider } from "../providers/details/subject/applicantSubject";
import { QualificationProvider } from "../providers/details/qualification";
import { ConfigProvider, Input } from "antd";
import x from "./colors";

type ThemeData = {
    borderRadius: number;
    colorPrimary: string;
};

const defaultData: ThemeData = {
    borderRadius: 6,
    colorPrimary: '#1677ff',
};
function MyApp({ Component, pageProps }: AppProps) {

    return (
        <>
            <ConfigProvider
                theme={{ token: { colorPrimary: x.primaryColor, borderRadius: 0, colorLink: '#f1c50e', colorLinkHover: '#090909', colorWarning: '#f70000' }, components: { Input: { colorTextPlaceholder: '' }, Select: { colorTextPlaceholder: '', sizeXL: 40 }, Table: { borderRadius: 0 } } }}>
                <CourseProvider>
                    <InstituteFacultyProvider>
                        <CampusProvider>
                            <InstitutionProvider>
                                <ApplicationProvider>
                                    <QualificationProvider>
                                        <SubjectProvider>
                                            <ApplicantSubjectProvider>
                                                <ParentProvider>
                                                    <AddressProvider>
                                                        <UserProvider>
                                                            <Component {...pageProps} />
                                                        </UserProvider>
                                                    </AddressProvider>
                                                </ParentProvider>
                                            </ApplicantSubjectProvider>
                                        </SubjectProvider>
                                    </QualificationProvider>
                                </ApplicationProvider>
                            </InstitutionProvider>
                        </CampusProvider>
                    </InstituteFacultyProvider>
                </CourseProvider>
            </ConfigProvider>
        </>
    );
}
export default MyApp;