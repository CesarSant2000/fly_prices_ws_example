import Link from 'next/link'
import Layout from '../components/Layout'
import {Grid} from "@mui/material";
import MainComponent from "@/components/MainComponent";

const IndexPage = () => (
    <Layout title="Home | Next.js + TypeScript Example">
        <MainComponent/>
    </Layout>
)

export default IndexPage
