import { useMutation, useQueryClient } from "react-query"

const useCostumMutation = (fn,uniqeKey)=>{
    const queryClient = useQueryClient();
    return useMutation(fn,{
        onSuccess:()=>{
            queryClient.invalidateQueries(uniqeKey)
        }
    })
}

export default useCostumMutation