import Image from 'next/image';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

export default function Logo() {
  return (
    <>
      <Container>
        <div style={{margin: 'auto',width: '400px'}}>
          <Link href="/">
            <Image src="/logo_hoorn.svg" height={100} width={400} alt="Picture of the author"/>
          </Link>
        </div>
      </Container>
    </>
  )
}
