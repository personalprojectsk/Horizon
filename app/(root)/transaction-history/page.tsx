import HeaderBox from '@/components/HeaderBox'
import TransactionsTable from '@/components/TransactionsTable';
import { BankTabItem } from '@/components/BankTabItem';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react'

const TransactionHistory = async ({ searchParams }:SearchParamProps) => {
  const params = await searchParams;
  const id = params?.id;
  const page = params?.page;

  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })

  if(!accounts) return;
  
  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId })

  const rowsPerPage = 10;
  const totalPages = Math.ceil((account?.transactions?.length ?? 0) / rowsPerPage);

  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = account?.transactions?.slice(
    indexOfFirstTransaction, indexOfLastTransaction
  ) ?? []

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox 
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">{account?.data.name}</h2>
            <p className="text-14 text-blue-25">
              {account?.data.officialName}
            </p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● {account?.data.mask}
            </p>
          </div>
          
          <div className='transactions-account-balance'>
            <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">{formatAmount(account?.data.currentBalance)}</p>
          </div>
        </div>

        <Tabs defaultValue={appwriteItemId} className="w-full">
          <TabsList className="recent-transactions-tablist">
            {accountsData.map((acc: Account) => (
              <TabsTrigger key={acc.id} value={acc.appwriteItemId}>
                <BankTabItem account={acc} appwriteItemId={appwriteItemId} />
              </TabsTrigger>
            ))}
          </TabsList>

          {accountsData.map((acc: Account) => (
            <TabsContent key={acc.id} value={acc.appwriteItemId} className="space-y-4">
              <section className="flex w-full flex-col gap-6">
                {currentTransactions.length > 0 ? (
                  <TransactionsTable transactions={currentTransactions} />
                ) : (
                  <p className="text-center text-sm text-gray-500 py-10">
                    No transactions found for this account.
                  </p>
                )}
              </section>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export default TransactionHistory