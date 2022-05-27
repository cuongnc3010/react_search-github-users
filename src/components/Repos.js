import React from 'react'
import styled from 'styled-components'
import { GithubContext, useGlobalContext } from '../context/context'
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'
const Repos = () => {
  const { repos } = useGlobalContext()

  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item
    //solution 1
    if (language) {
      if (total[language]) {
        total[language] = {
          label: language,
          value: total[language].value + 1,
          stars: total[language].stars + stargazers_count,
        }
      } else {
        total[language] = {
          ...total[language],
          value: 1,
          stars: stargazers_count,
        }
      }
    }

    return total
  }, {})
  //
  //convert to array
  //sort by number of repos
  //get firt five languages
  const mostUsed = Object.values(languages)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  const mostPopular = Object.values(languages)
    .sort((a, b) => b.stars - a.stars)
    .map((item) => ({ ...item, value: item.stars })) // assign "stars" property to "value" property
    .slice(0, 5)

  //stars, forks
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks_count } = item
      total.stars[stargazers_count] = { label: name, value: stargazers_count }
      total.forks[forks_count] = { label: name, value: forks_count }
      return total
    },
    { stars: {}, forks: {} }
  )
  stars = Object.values(stars).slice(-5).reverse()
  forks = Object.values(forks).slice(-5).reverse()

  // const chartData = [
  //   { label: 'HTML', value: '15' },
  //   { label: 'CSS', value: '40' },
  //   { label: 'Javascript', value: '45' },
  // ]

  return (
    <section className='section' d>
      <Wrapper className='section-center'>
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
        {/* <ExampleChart data={chartData} />; */}
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
