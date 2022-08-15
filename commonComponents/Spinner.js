import Image from 'next/image'
import styled from 'styled-components'

const SpinnerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const SpinnerBox = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
  width: 100%;
`

const EmptyBox = styled.div`
  backgroundcolor: green;
  height: 100px;
  width: 100%;
`

export default function Spinner() {
  return (
    <SpinnerWrapper>
      <SpinnerBox>
        <Image src="/spinner.svg" alt="" width="50" height="50" />
      </SpinnerBox>
      <EmptyBox />
    </SpinnerWrapper>
  )
}
