import EventForm from '../components/EventForm';
import EventTable from '../components/EventTable';
import SearchBar from '../components/SearchBar';
import SearchHistory from '../components/SearchHistory';

function Dashboard() {
    return (
        <section>
            <h1>Dashboard</h1>
            <SearchBar />
            <SearchHistory />
            <EventForm />
            <EventTable />
        </section>
    );
}

export default Dashboard;
