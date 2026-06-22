import React from 'react';
import CompanyPage from './CompanyPage';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompany } from '@/lib/api/companies';

const CompanyProfile = async() => {
    const recruiter =await getUserSession(); // Get the current logged-in recruiter session
    const company = await getRecruiterCompany(recruiter.id); // Fetch the company data associated with the recruiter    
    // console.log(companyData);
    return (
        <div>
            <CompanyPage recruiter={recruiter} companyData={company} />
        </div>
    );
};

export default CompanyProfile;