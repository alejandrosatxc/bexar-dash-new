import getMaster from '../../lib/master'
import { memes, simplePie } from '../../lib/myfuncs'
import 'chart.js/auto';
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
import { Container, Row, Col } from 'react-bootstrap';

export async function getStaticProps() {
    const master = await getMaster()
    return ({ props: { master } })
}

export default function Poll({ master }) {

    return (
        <Container fluid>
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