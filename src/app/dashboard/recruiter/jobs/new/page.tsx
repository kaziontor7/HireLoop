import { getLoggedInRecruiterCompany } from "@/lib/api/companies";
import NewJobForm from "./NewJobForm";

const NewJobPage = async () => {

    const company = await getLoggedInRecruiterCompany();
    
    return (
        <div>
            <NewJobForm company={company} />
        </div>
    );
};

export default NewJobPage;