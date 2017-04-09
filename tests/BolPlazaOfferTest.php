<?php


use App\BolPlazaClient\Entities\OfferCreate;
use App\Jobs\ProcessShippedOrder;
use App\Order;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Wienkit\BolPlazaClient\BolPlazaClient;
use Wienkit\BolPlazaClient\Entities\BolPlazaOfferCreate;


class BolPlazaOfferTest extends BrowserKitTestCase
{

    private $client;


    public function setUp()
    {
        $publicKey = 'FAxYcUmVPSQJBxToanfMIHgCDkBgSyFi';
        $privateKey = 'jJRKGfHaeYHeHSMnXMFlmSXIlyFvTsDybhUIcaOEMnqQasqbwGSFRcrUIXFZXLZGGbmktbsjzwBMLNjiEXAkVvTkFaizmoLSPdATTjLwCURcqbCMuGKsGtqLBUjgPECOZCgfwveHrSNLWWxzgsrthCeRykzjnNKcWyHnWgUlYXDdPoKiNbZxHgfXmgOkJojOQUzsDRlFQvWwqpzMLZguuqzJeWYfVDApsCVSFwneWvtxVejyFvfDfjXurXYYUluJ';

        $this->client = new BolPlazaClient($publicKey, $privateKey);
        $this->client->setTestMode(false);
    }

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testCreateOffer()
    {
        //$this->setUp();
        $offerCreate = new BolPlazaOfferCreate();
        $offerCreate->EAN = '0619659077013';
        $offerCreate->Condition = 'NEW';
        $offerCreate->Price = '10.00';
        $offerCreate->DeliveryCode = '24uurs-16';
        $offerCreate->QuantityInStock = '1';
        $offerCreate->Publish = 'true';
        $offerCreate->ReferenceCode = '1234567890';
        $offerCreate->Description = 'This is a new product so this description is of no use.';
        try{
            $this->client->createOffer("1", $offerCreate);
        } catch (Exception $e) {
            dd($e->getMessage());
        }

    }


    public function testUpdateOffer()
    {
        $offerUpdate = new OfferUpdate();
        $offerUpdate->Price = '12.00';
        $offerUpdate->DeliveryCode = '24uurs-16';
        $offerUpdate->Publish = 'true';
        $offerUpdate->ReferenceCode = '1234567890';
        $offerUpdate->Description = 'This is a new product so this description is of no use.';
        return $this->client->updateOffer("1", $offerUpdate);
    }

    public function testUpdateOfferStock()
    {
        $stockUpdate = new OfferStockUpdate();
        $stockUpdate->QuantityInStock = '2';
        return $this->client->updateOfferStock("1", $stockUpdate);
    }

    public function testDeleteOffer()
    {
        return $this->client->deleteOffer("1");
    }

    public function testGetOwnOffers()
    {
        /*$result = $this->client->getOwnOffers();
        dd($result->Url);*/
        $data = $this->client->getOwnOffersResult("https://plazaapi.bol.com/offers/v1/export/hxfOJkEpVPWtRZYPvxnEzGmFONfVWuOubTGFFclEGWeHqfQgjyLMOfVvKKkg.csv");
        $data = explode("\n",$data);
        //dd($data);
        foreach ($data as $row)
        {
            $rowitem = explode(',',$row);
            if(isset($rowitem[1]))
                $element[] = $rowitem[1];
        }
        $i=0;
        foreach($element as $offerid)
        {
            if($i>1){
                try{
                    $this->client->deleteOffer(str_replace('"','',$offerid));
                } catch (Exception $e) {
                    echo $e->getMessage();
                }
            }

            $i++;
        }
        dd('done');
        $this->assertEquals($result->Url, 'https://test-plazaapi.bol.com/offers/v1/export/offers.csv');
        return $result->Url;
    }

    /**
     * @param $url
     * @depends testGetOwnOffers
     */
    public function testGetOwnOffersResult($url)
    {
        return $this->client->getOwnOffersResult($url);
        self::assertNotNull($result);
        self::assertStringStartsWith("OfferId", $result);
    }

    public function testProcessShipments()
    {
        $shipment = new PlazaShipmentRequest();
        $shipment->OrderItemId = '123';
        $shipment->ShipmentReference = 'bolplazatest123';
        $shipment->DateTime = date('Y-m-d\TH:i:s');
        $shipment->ExpectedDeliveryDate = date('Y-m-d\TH:i:s');
        $transport = new PlazaTransport();
        $transport->TransporterCode = 'GLS';
        $transport->TrackAndTrace = '123456789';
        $shipment->Transport = $transport;
        $result = $this->client->processShipment($shipment);
        $this->assertEquals($result->eventType, 'CONFIRM_SHIPMENT');
    }


    public function testCheckForNotShippedOrders()
    {
        $processStatusId = '7581864';
        $result = $this->client->getProcessStatus($processStatusId);
        dd($result);

    }



}
