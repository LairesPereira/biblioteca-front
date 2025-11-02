import FormRegisterBook from '@/components/FormRegisterBook';
import Header from '@/components/Header';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-white">
      <Header 
        userType='admin'
      />
      <div className="flex items-center justify-center pt-24 px-4">
        <FormRegisterBook />
      </div>
    </div>
  );
}
