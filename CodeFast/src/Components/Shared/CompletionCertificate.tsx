import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Course } from '../User/Courses'; // Assuming this is where your Course interface is defined

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  logo: {
    width: 120,
    height: 60,
    marginBottom: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    marginBottom: 20,
    padding: 20,
    border: '2px solid #000',
    borderRadius: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  highlight: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  footer: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 12,
  },
  date: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 12,
  },
});

// PDF Certificate Document component
const CertificateDocument = ({ userName, course }: {userName: string; course:Course}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image 
          style={styles.logo} 
          src="../../../logo.jpg" // Replace with actual logo path
        />
        <Text style={styles.title}>Certificate of Completion</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.text}>This is to certify that</Text>
        <Text style={styles.highlight}>{userName}</Text>
        <Text style={styles.text}>has successfully completed the course</Text>
        <Text style={styles.highlight}>{course.name}</Text>
        <Text style={styles.subtitle}>{course.subtitle}</Text>
        <Text style={styles.text}>Instructed by: {course.instructor?.name || "Instructor"}</Text>
      </View>
      
      <View style={styles.date}>
        <Text>Date: {new Date().toLocaleDateString()}</Text>
      </View>
      
      <View style={styles.footer}>
        <Text>Thank you for learning with us!</Text>
      </View>
    </Page>
  </Document>
);

// Main Certificate component
const Certificate = ({ userName, course }: {userName: string; course:Course}) => {
  if (!userName || !course) {
    return <div>Loading certificate data...</div>;
  }
  console.log("Certificate component props: ", userName, course);

  return (
    
      <PDFDownloadLink 
        document={<CertificateDocument userName={userName} course={course} />} 
        fileName={`${course.name.replace(/\s+/g, '-')}-certificate.pdf`}
        style={{
          padding: '10px 15px',
          backgroundColor: '#4CAF50',
          color: 'white',
          borderRadius: '4px',
          textDecoration: 'none',
          display: 'inline-block',
          marginTop: '20px',
          cursor: 'pointer'
        }}
      >
        {({ blob, url, loading, error }) => {
            if (error) {
                console.log("errort = ", error)
                return 'Error generating certificate!';
            }
            if (blob || url){}
            return loading ? 'Generating your certificate...' : 'Download Certificate'
        }
        }
      </PDFDownloadLink>
  );
};

export default Certificate;