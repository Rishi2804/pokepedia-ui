import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useMoveDetails} from "../../../services/api/hooks/useMoveData.ts";
import {useEffect} from "react";


const Move = () => {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { data } = useMoveDetails({moveIdOrName: id ?? 0})
    const navigate = useNavigate();

    useEffect(() => {
        if (id && !isNaN(Number(id))) {
            setSearchParams({ id: id }, {replace: true});
        } else {
            setSearchParams({}, {replace: true});
        }
    }, [id, searchParams]);

    useEffect(() => {
        if (id && !isNaN(Number(id)) && data) {
            const moveName = data.name.toLowerCase().replace(" ", "-");
            navigate(`/move/${moveName}`, { replace: true });
        }
    }, [id, data, navigate]);

    return (
        <div>

        </div>
    );
};

export default Move;