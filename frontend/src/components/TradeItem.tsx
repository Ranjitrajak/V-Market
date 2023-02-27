import React, { FC } from 'react'
import TradeType from '../types/trade';
import { Card, CardContent,Typography,} from "@mui/material";

type TradeProps = {
    item: TradeType

};

const TradeItem: FC<TradeProps> = ({ item }: TradeProps): JSX.Element => {
    return (
        <div>
            <Card
                sx={{
                    width: "25%",
                    margin: "auto",
                    mt: 2,
                    padding: 2,
                    boxShadow: "5px 5px 10px #ccc",
                    ":hover": {
                        boxShadow: "10px 10px 20px #ccc",
                    },
                }}
            >
                <CardContent >

                    <Typography sx={{ mb: 1 }} style={{ fontWeight: 'bold' }} variant="body2">
                        ProductName: {item.product.name}
                    </Typography>

                    <Typography style={{ fontWeight: 'bold' }} variant="body2">
                        Importer:{item.importer.name}
                    </Typography>
                    <Typography style={{ fontWeight: 'bold' }} variant="body2">
                        Exporter: {item.exporter.name}
                    </Typography>
                    <Typography sx={{ mt: 1 }} style={{ fontWeight: 'bold' }} variant="body2">
                        Quantity: {item.quantity}
                    </Typography>

                </CardContent>

            </Card>






        </div>
    )
}

export default TradeItem