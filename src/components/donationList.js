import DonationItem from "./donationItem";
import '../styles/donationlist.css';

function DonationList({ donations }) {
    return (
        <div className="donation-list">
            {donations.map(donation => (
                <DonationItem key={donation.id} donation={donation} />
            ))}
        </div>
    );
}

export default DonationList;