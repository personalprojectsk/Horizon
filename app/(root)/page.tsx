import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {
  const loggedIn = { firstName: 'Sujith', lastName: 'Kumar', email: 'SujithKumar@gmail.com' };
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

      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 123.50}, {currentBalance: 423.50}]}
      />
    </section>
      
    
  )
}

export default Home