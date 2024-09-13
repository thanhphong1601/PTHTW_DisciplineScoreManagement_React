import React, { useContext, useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import Chart from "react-apexcharts";
import { Button, Table } from "react-bootstrap";
import { authApi, endpoints } from "../../configs/APIs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import PdfViewer from "../Common/PdfViewer";
import { MyUserContext } from "../../configs/Contexts";
import { useNavigate } from "react-router-dom";


const ChartByClass = () => {
    const [labels, setLabels] = useState([]);
    const [classQuantity, setClassQuantity] = useState([]);
    const [joinedActivities, setJoinedActivities] = useState([]);
    const [noJoining, setNoJoining] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null);
    const user = useContext(MyUserContext);
    const nav = useNavigate();
    
    if (user === null)
        nav('/login');

    const data = [
        [
            1,
            "DH21CS01",
            2,
            2,
            [
                1,
                "Test",
                4
            ],
            [
                4,
                "Hú hú khẹt khẹt",
                1
            ],
            [
                1,
                "Test Activity",
                2
            ],
            0,
            [
                1,
                "Test",
                18
            ]
        ],
        [
            2,
            "DH21CS02",
            4,
            3,
            [
                9,
                "Fonn",
                5
            ],
            [
                3,
                "Thanh Phong",
                1
            ],
            [
                1,
                "Test Activity",
                5
            ],
            1,
            [
                9,
                "Fonn",
                25
            ]
        ]
    ]

    const [stats, setStats] = useState([]);




    const loadChart = async () => {

        try {
            let res = await authApi().get(endpoints['stat-class']);
            let resData = res.data;

            let tempLabels = [];
            let tempClassQuantity = [];
            let tempJoinedActivities = [];
            let tempNoJoining = [];


            resData.forEach(e => {
                tempLabels.push(e[1]);
                tempClassQuantity.push(e[2]);
                tempJoinedActivities.push(e[3]);
                tempNoJoining.push(e[7]);
            });

            setLabels(tempLabels);
            setClassQuantity(tempClassQuantity);
            setJoinedActivities(tempJoinedActivities);
            setNoJoining(tempNoJoining);
            setStats(resData);


        } catch (ex) {
            console.error(ex);
        }
    }

    const addFonts = (doc) => {
        // Thay thế 'base64_encoded_font_data_here' bằng dữ liệu base64 của bạn
        // doc.addFileToVFS('times.ttf', 'src\components\Common\Fonts\times.txt');
        doc.addFont('times.ttf', 'Times', 'normal');
    };

    const generatePDF = async (e) => {
        e.preventDefault();

        try {
            let res = await authApi().get(endpoints['stat-class-pdf'], {
                responseType: 'blob'
            });

            // console.info(res.data);
            // console.info(res.status);

            // const fileURL = window.URL.createObjectURL(new Blob([res.data]));
            // setPdfUrl(fileURL);

            if (res.status === 200) {
                const blob = new Blob([res.data], { type: 'application/pdf' });
                const fileURL = window.URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = fileURL;
                link.setAttribute('download', 'stat_class.pdf'); // Tên file PDF
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(fileURL);
            }
        } catch (ex) {
            console.error(ex);
        }
        
    };

    useEffect(() => {
        loadChart();
    }, [])

    const series = [{
        name: "Số lượng sinh viên của lớp",
        data: classQuantity
    }, {
        name: "Số lượng sinh viên đăng ký tham gia hoạt động",
        data: joinedActivities
    }, {
        name: "Số lượng sinh viên không tham gia",
        data: noJoining
    }];

    const options = {
        chart: {
            type: 'bar',
            height: 700,
            width: 1380,
            stacked: true,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: true
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            title: {
                text: "Biểu đồ thống kê sinh viên tham gia hoạt động theo lớp",
                style: {
                    fontSize: "20px" // Chỉnh kích thước font cho x-axis labels
                }
            },
            categories: labels,

        },
        yaxis: {
            title: {
                text: 'Số lượng sinh viên',
                style: {
                    fontSize: "20px" // Chỉnh kích thước font cho x-axis labels
                }
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val;
                }
            }
        }
    };



    return <>
        <div style={{ alignItems: "center", alignContent: "center", backgroundColor: "lightblue", borderRadius: 10, height: 60, marginLeft: 20, marginRight: 20, margin: 10 }}>
            <h1 className="text-center mt-3 mb-3">Thống Kê Theo Lớp</h1>
        </div>
        <div className="text-end mt-2 mb-2">
        <Button style={{width: 120, marginRight: 10}}  onClick={e => generatePDF(e)}>Xuất File Pdf</Button>
        </div>
        
        <div id="pdf-content">
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Mã lớp</th>
                        <th>Tên lớp</th>
                        <th>Tổng số sinh viên</th>
                        <th>Tổng số sinh viên tham gia hoạt động</th>
                        <th>Sinh viên tích cực nhất</th>
                        <th>Số hoạt động tham gia</th>
                        <th>ĐRL</th>
                        <th>Hoạt động được tham gia nhiều nhất</th>
                        <th>Không tham gia</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map(d => <tr>
                        <td>{d[0]}</td>
                        <td>{d[1]}</td>
                        <td>{d[2]}</td>
                        <td>{d[3]}</td>
                        <td>{d[4][1]}</td>
                        <td>{d[4][2]}</td>
                        <td>{d[8][2]}</td>
                        <td>{d[6][1]}</td>
                        <td>{d[7]}</td>
                    </tr>)}
                </tbody>
            </Table>
        </div>
        
        


        <div>
            <Chart
                options={options}
                series={series}
                type="bar"
                height={700}
                width={1380}
            />
        </div>


        

    </>
}

export default ChartByClass;