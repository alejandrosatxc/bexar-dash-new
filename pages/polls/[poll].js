import getMaster from '../../lib/master'
import { memes, simplePie } from '../../lib/myfuncs'
import 'chart.js/auto';
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
import { Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router'

export async function getStaticPaths() {
    return {
        paths: [
            { params: { poll: '1' } },
            { params: { poll: '2' } },
            { params: { poll: '3' } },
            { params: { poll: '4' } },
            { params: { poll: '5' } },
            { params: { poll: '6' } },
            { params: { poll: '7' } },
        ],
        fallback: false,
    }
}

export async function getStaticProps() {
    const master = await getMaster()
    return ({ props: { master } })
}

export default function Poll({ master }) {

    const router = useRouter()
    const { poll } = router.query
    const pollNum = poll - 1

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1>Here is the poll number from the URL {poll}</h1>
                </Col>
                <Col>

                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>For the following 3 charts, respondents were asked:  Which government level do you think should take the lead in addressing the stated issue?</h2>
                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
                <Col>

                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
                <Col>

                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
            </Row>
        </Container>

    )

}