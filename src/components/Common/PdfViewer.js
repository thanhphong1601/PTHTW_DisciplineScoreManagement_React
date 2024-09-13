import React from 'react';

const PdfViewer = ({ pdfUrl }) => {
    return (
        <div style={{ height: '100vh' }}>
            {pdfUrl ? (
                <iframe
                    src={pdfUrl}
                    width="100%"
                    height="100%"
                    title="PDF Viewer"
                />
            ) : (
                <p>Loading PDF...</p>
            )}
        </div>
    );
};

export default PdfViewer;