import DiamondIcon from '@mui/icons-material/Diamond';
import React from 'react';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
type Params = {
    rank: string,
}

const CookerRankIcon = ({rank}: Params) => {
    return (
        <>
            {
                rank == "Diamond" && (
                    <DiamondIcon sx={{color: 'lightblue'}}/>
                ) ||  rank == "Gold" && (
                    <WorkspacePremiumIcon sx={{color: 'gold'}} />
                ) ||  rank == "Silver" &&  (
                    <WorkspacePremiumIcon sx={{color: 'silver'}}/>
                ) ||  rank == "Bronze" && (
                    <WorkspacePremiumIcon sx={{color: 'brown'}}/>
                )
            }
        </>
    );
};

export default CookerRankIcon;