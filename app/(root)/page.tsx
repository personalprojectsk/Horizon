import HeaderBox from '@/components/ui/HeaderBox'
import TotalBalanceBox from '@/components/ui/TotalBalanceBox'
import React from 'react'

const Home = () => {
  const loggedIn = { firstName: 'Sujith', lastName: 'Kumar' }
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account, and transactions effectively."
          />

          <TotalBalanceBox 
          accounts={[]}
          totalBanks={3}
          totalCurrentBalance={2000.20}
          />
        </header>
      </div>
    </section>
      
    
  )
}

export default Home